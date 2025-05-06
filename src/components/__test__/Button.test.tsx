import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Button } from "../Button";

describe("Button component", () => {
  it("renders the label correctly", () => {
    render(<Button label="Click me" />);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" onClick={handleClick} />);

    const button = screen.getByRole("button", { name: "Click me" });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when the disabled prop is true", () => {
    render(<Button label="Disabled" disabled />);
    const button = screen.getByRole("button", { name: "Disabled" });
    expect(button).toBeDisabled();
  });

  it("includes the provided className", () => {
    render(<Button label="Class test" className="custom-class" />);
    const button = screen.getByRole("button", { name: "Class test" });
    expect(button.className).toContain("custom-class");
  });
});
