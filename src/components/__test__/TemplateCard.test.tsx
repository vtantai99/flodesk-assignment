import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { TemplateCard } from "../TemplateCard";

describe("TemplateCard Component", () => {
  it("should render TemplateCard with label and content", () => {
    render(
      <TemplateCard label="Test Label">
        <div>Test Content</div>
      </TemplateCard>
    );
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should call onClick when card is clicked", () => {
    const mockOnClick = vi.fn();
    render(
      <TemplateCard label="Test Label" onClick={mockOnClick}>
        <div>Test Content</div>
      </TemplateCard>
    );
    fireEvent.click(screen.getByText("Test Label"));
    expect(mockOnClick).toHaveBeenCalled();
  });
});
