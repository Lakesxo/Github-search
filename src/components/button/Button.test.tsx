import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";
import { describe, test, expect, vi } from "vitest";

export const buttonTests = () => {
  test("renders with the correct name", () => {
    render(<Button name="Click Me" variant="primary" onClick={() => {}} />);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test("triggers onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button name="Click Me" variant="primary" onClick={handleClick} />);
    const buttonElement = screen.getByText(/Click Me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("is disabled when the disabled prop is true", () => {
    render(
      <Button name="Click Me" variant="primary" onClick={() => {}} disabled />
    );
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeDisabled();
  });

  test("applies the correct variant class", () => {
    render(<Button name="Click Me" variant="primary" onClick={() => {}} />);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toHaveClass("primary");
  });

  test("renders loading icon when in loading state", () => {
    render(
      <Button
        name="Click Me"
        variant="secondary"
        onClick={() => {}}
        isLoading
      />
    );
    const loadingIcon = screen.getByTestId("loading-icon");
    expect(loadingIcon).toBeInTheDocument();
  });

  test("does not render loading icon when in loading state", () => {
    render(
      <Button
        name="Click Me"
        variant="secondary"
        onClick={() => {}}
        isLoading={false}
      />
    );
    const loadingIcon = screen.queryByTestId("loading-icon");
    expect(loadingIcon).toBeNull();
  });

  test("renders prefix icon when it is passed", () => {
    render(
      <Button
        name="Click Me"
        variant="secondary"
        onClick={() => {}}
        prefixIcon={<div data-testid="prefix-icon" />}
      />
    );
    const prefixIcon = screen.getByTestId("prefix-icon");
    expect(prefixIcon).toBeInTheDocument();
  });

  test("renders suffix icon when it is passed", () => {
    render(
      <Button
        name="Click Me"
        variant="secondary"
        onClick={() => {}}
        suffixIcon={<div data-testid="suffix-icon" />}
      />
    );
    const suffixIcon = screen.getByTestId("suffix-icon");
    expect(suffixIcon).toBeInTheDocument();
  });
};

describe("Button Component", buttonTests);
