import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Input } from "./input";

test("should show input", () => {
  render(<Input label="input" />);
  const input = screen.getByTestId("input");
  expect(input).toBeInTheDocument();
});

test("should show button with error state", () => {
  render(<Input label="input" error="error" />);
  const input = screen.getByTestId("input");
  const error = screen.getByText("error");
  expect(input).toBeInTheDocument();
  expect(error).toBeInTheDocument();
});
