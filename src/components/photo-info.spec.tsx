import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { PhotoInfo, PhotoInfoLoading } from "./photo-info";
import { AuthProvider } from "@/lib/auth";

test("should show photo info loading", () => {
  render(<PhotoInfoLoading />);
  const input = screen.getByTestId("loading-info");
  expect(input).toBeInTheDocument();
});

test("should show photo with info with like", () => {
  render(
    <AuthProvider>
      <PhotoInfo
        alt="alt"
        link="link"
        color="#f00"
        id={123}
        img="image"
        name="John Doe"
        selected
      />
    </AuthProvider>
  );
  const name = screen.getByText("John Doe");
  const alt = screen.getByText("alt");
  const color = screen.getByText("#f00");
  const star = screen.getByTestId("liked");

  expect(name).toBeInTheDocument();
  expect(alt).toBeInTheDocument();
  expect(color).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(star).toBeInTheDocument();
});

test("should show photo with info without like", () => {
  render(
    <AuthProvider>
      <PhotoInfo
        alt="alt"
        link="link"
        color="#f00"
        id={123}
        img="image"
        name="John Doe"
      />
    </AuthProvider>
  );
  const name = screen.getByText("John Doe");
  const alt = screen.getByText("alt");
  const color = screen.getByText("#f00");
  const star = screen.getByTestId("unliked");

  expect(name).toBeInTheDocument();
  expect(alt).toBeInTheDocument();
  expect(color).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(star).toBeInTheDocument();
});
