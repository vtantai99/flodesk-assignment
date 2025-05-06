import { render, screen, fireEvent } from "@testing-library/react";
import { InputField } from "../../Form/InputField";
import { vi } from "vitest";

describe("InputField component", () => {
  it("renders the label correctly", () => {
    render(<InputField label="Username" />);
    const label = screen.getByLabelText("Username");
    expect(label).toBeInTheDocument();
  });

  it("renders an input with the correct id", () => {
    render(<InputField label="Username" id="username" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id", "username");
  });

  it("generates input id based on label if no id prop is provided", () => {
    render(<InputField label="Username" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id", "username");
  });

  it("fires onChange event correctly", () => {
    const handleChange = vi.fn();
    render(<InputField label="Username" onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("allows additional props like placeholder", () => {
    render(<InputField label="Username" placeholder="Enter your username" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("placeholder", "Enter your username");
  });
});
