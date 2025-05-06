import { render, screen, fireEvent } from "@testing-library/react";
import { TextareaField } from "../../Form/TextAreaField";
import { vi } from "vitest";

describe("TextareaField component", () => {
  const label = "Description";
  const placeholder = "Enter your description here";

  it("renders the label correctly", () => {
    render(<TextareaField label={label} placeholder={placeholder} />);
    const labelElement = screen.getByLabelText(label);
    expect(labelElement).toBeInTheDocument();
  });

  it("generates textarea id based on label if no id prop is provided", () => {
    render(<TextareaField label={label} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("id", "description");
  });

  it("renders the textarea with placeholder correctly", () => {
    render(<TextareaField label={label} placeholder={placeholder} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("placeholder", placeholder);
  });

  it("fires onChange event correctly", () => {
    const handleChange = vi.fn();
    render(<TextareaField label={label} onChange={handleChange} />);
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "New description" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
