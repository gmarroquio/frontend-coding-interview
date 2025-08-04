import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { AuthProvider } from "@/lib/auth";
import * as auth from "@/lib/auth";
import Page from "./page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as navigation from "next/navigation";
import { act } from "react";

jest.mock("../lib/auth", () => ({
  ...jest.requireActual("../lib/auth"),
  useUser: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  redirect: jest.fn(),
}));

describe("All Photos page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should redirect to photos", () => {
    const redirect = jest.spyOn(navigation, "redirect");
    jest.spyOn(auth, "useUser").mockImplementation(
      () =>
        ({
          user: { name: "John Doe", email: "test@test.com", liked: {} },
        } as any)
    );
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Page />
        </AuthProvider>
      </QueryClientProvider>
    );
    expect(redirect).toHaveBeenCalled();
  });

  test("Should sign in", async () => {
    const signIn = jest.fn();
    jest.spyOn(auth, "useUser").mockImplementation(
      () =>
        ({
          user: undefined,
          signIn,
        } as any)
    );
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Page />
        </AuthProvider>
      </QueryClientProvider>
    );

    const emailInput = screen.getByTestId("input-email");
    const passwordInput = screen.getByTestId("input-password");
    const submit = screen.getByText("Sign in");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submit).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "12345678" } });
      fireEvent.click(submit);
    });

    expect(signIn).toHaveBeenCalledWith("test@test.com", "12345678");
  });
});
