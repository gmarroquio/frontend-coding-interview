import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { AuthProvider } from "@/lib/auth";
import * as auth from "@/lib/auth";
import * as photos from "@/lib/photos";
import Page from "./page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as navigation from "next/navigation";
import { act } from "react";

jest.mock("../../lib/auth", () => ({
  ...jest.requireActual("../../lib/auth"),
  useUser: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  redirect: jest.fn(),
}));

jest.mock("../../lib/photos.ts", () => ({
  ...jest.requireActual("../../lib/photos.ts"),
  useGetPhotos: jest.fn(),
}));

const mockPhotos = [
  {
    id: 1,
    photographer: "John Doe",
    alt: "Alt",
    photographer_url: "link",
    avg_color: "#f00",
    src: {
      medium: "src",
    },
  },
  {
    id: 2,
    photographer: "Jane Doe",
    alt: "Alt",
    photographer_url: "link",
    avg_color: "#0f0",
    src: {
      medium: "src",
    },
  },
  {
    id: 3,
    photographer: "Test",
    alt: "Alt",
    photographer_url: "link",
    avg_color: "#00f",
    src: {
      medium: "src",
    },
  },
];

describe("All Photos page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should redirect to home", () => {
    const redirect = jest.spyOn(navigation, "redirect");
    jest.spyOn(auth, "useUser").mockImplementation(
      () =>
        ({
          user: undefined,
        } as any)
    );
    jest.spyOn(photos, "useGetPhotos").mockImplementation(
      () =>
        ({
          isLoading: true,
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

  test("should show all photos page loading", () => {
    jest.spyOn(auth, "useUser").mockImplementation(
      () =>
        ({
          user: { name: "John Doe", email: "test@test.com", liked: {} },
        } as any)
    );
    jest.spyOn(photos, "useGetPhotos").mockImplementation(
      () =>
        ({
          isLoading: true,
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
    const loading = screen.getAllByTestId("loading-info");
    expect(loading).toHaveLength(4);
  });

  test("should show all photos page after loading", () => {
    const queryClient = new QueryClient();
    jest.spyOn(auth, "useUser").mockImplementation(
      () =>
        ({
          user: {
            name: "John Doe",
            email: "test@test.com",
            liked: { 2: true },
          },
        } as any)
    );
    jest.spyOn(photos, "useGetPhotos").mockImplementation(
      () =>
        ({
          isLoading: false,
          data: {
            photos: mockPhotos,
          },
        } as any)
    );
    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Page />
        </AuthProvider>
      </QueryClientProvider>
    );

    const loading = screen.getAllByTestId("photo-info");
    const john = screen.getByText("John Doe");
    const jane = screen.getByText("Jane Doe");
    const test = screen.getByText("Test");
    const color1 = screen.getByText("#f00");
    const color2 = screen.getByText("#0f0");
    const color3 = screen.getByText("#00f");

    expect(loading).toHaveLength(3);
    expect(john).toBeInTheDocument();
    expect(jane).toBeInTheDocument();
    expect(test).toBeInTheDocument();
    expect(color1).toBeInTheDocument();
    expect(color2).toBeInTheDocument();
    expect(color3).toBeInTheDocument();
    expect(screen.getAllByTestId("liked")).toHaveLength(1);
    expect(screen.getAllByTestId("unliked")).toHaveLength(2);
  });

  test("should change liked state", async () => {
    const queryClient = new QueryClient();
    const user: any = {
      name: "John Doe",
      email: "test@test.com",
      liked: { 2: true },
    };
    const toggleLike = jest
      .fn()
      .mockImplementation(
        (id: number) =>
          (user.liked[id] = { ...user.liked, [id]: !user.liked[id] })
      );
    jest.spyOn(auth, "useUser").mockImplementation(
      () =>
        ({
          user,
          toggleLike,
        } as any)
    );
    jest.spyOn(photos, "useGetPhotos").mockImplementation(
      () =>
        ({
          isLoading: false,
          data: {
            photos: mockPhotos,
          },
        } as any)
    );
    const { rerender } = render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Page />
        </AuthProvider>
      </QueryClientProvider>
    );

    expect(screen.getAllByTestId("liked")).toHaveLength(1);
    expect(screen.getAllByTestId("unliked")).toHaveLength(2);

    const [unliked] = screen.getAllByTestId("unliked");
    await act(async () => {
      fireEvent.click(unliked);
    });
    rerender(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Page />
        </AuthProvider>
      </QueryClientProvider>
    );
    expect(toggleLike).toHaveBeenCalled();
    expect(screen.getAllByTestId("liked")).toHaveLength(2);
    expect(screen.getAllByTestId("unliked")).toHaveLength(1);
  });
});
