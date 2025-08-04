import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Button } from "./button";

test("should show button", () => {
  render(<Button />);
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});

test("should show button with loading state", () => {
  render(<Button loading />);
  const button = screen.getByText("Loading...");
  expect(button).toBeInTheDocument();
});
