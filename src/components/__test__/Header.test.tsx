import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "../Header";
import { useTemplate } from "@/context/TemplateContext";
import { vi } from "vitest";
import heroTemplate from "@/templates/hero.json";
import { ElementNode } from "@/types/dom";

const mockTemplate = heroTemplate as ElementNode;

vi.mock("@/context/TemplateContext", () => ({
  useTemplate: vi.fn(),
}));

vi.mock("../Button", () => ({
  Button: ({ label, onClick }: { label: string; onClick: () => void }) => <button onClick={onClick}>{label}</button>,
}));

describe("Header Component", () => {
  it("should render the title and export button when a template is selected", () => {
    const mockSetSelectedTemplate = vi.fn();
    vi.mocked(useTemplate).mockReturnValue({
      selectedTemplate: mockTemplate,
      setSelectedTemplate: mockSetSelectedTemplate,
    });

    const mockOnExport = vi.fn();
    render(<Header title="My Header" onExport={mockOnExport} />);

    expect(screen.getByText("My Header")).toBeInTheDocument();
    expect(screen.getByText("Export")).toBeInTheDocument();
  });

  it("should call `setSelectedTemplate` with null when logo is clicked", () => {
    const mockSetSelectedTemplate = vi.fn();
    vi.mocked(useTemplate).mockReturnValue({
      selectedTemplate: mockTemplate,
      setSelectedTemplate: mockSetSelectedTemplate,
    });

    const mockOnExport = vi.fn();
    render(<Header title="My Header" onExport={mockOnExport} />);

    fireEvent.click(screen.getByText("My Header"));

    expect(mockSetSelectedTemplate).toHaveBeenCalledWith(null);
  });

  it("should not render export button when no template is selected", () => {
    const mockSetSelectedTemplate = vi.fn();
    vi.mocked(useTemplate).mockReturnValue({
      selectedTemplate: null,
      setSelectedTemplate: mockSetSelectedTemplate,
    });

    const mockOnExport = vi.fn();
    render(<Header title="My Header" onExport={mockOnExport} />);

    expect(screen.queryByText("Export")).not.toBeInTheDocument();
  });

  it("should call onExport when export button is clicked", () => {
    const mockSetSelectedTemplate = vi.fn();
    vi.mocked(useTemplate).mockReturnValue({
      selectedTemplate: mockTemplate,
      setSelectedTemplate: mockSetSelectedTemplate,
    });

    const mockOnExport = vi.fn();
    render(<Header title="My Header" onExport={mockOnExport} />);

    fireEvent.click(screen.getByText("Export"));

    expect(mockOnExport).toHaveBeenCalled();
  });
});
