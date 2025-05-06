import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { ElementNode, ElementType } from "@/types/dom";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import styles from "../PageSettings/PageSettings.module.css";
import { PageSettings } from "../PageSettings";

// Mock the useBreakpoint hook
vi.mock("@/hooks/useBreakpoint");
const mockUseBreakpoint = useBreakpoint as unknown as ReturnType<typeof vi.fn>;

describe("PageSettings", () => {
  const mockUpdateElement = vi.fn();

  beforeEach(() => {
    mockUpdateElement.mockClear();
    mockUseBreakpoint.mockReturnValue(false);
  });

  const defaultElement = {
    id: "test-id",
    type: ElementType.PAGE,
    tag: "div",
    styles: {},
    attributes: {},
    content: "",
  } as const;

  it("renders page settings correctly", () => {
    render(<PageSettings selectedElement={defaultElement} updateElement={mockUpdateElement} />);

    expect(screen.getByText("Page settings")).toBeInTheDocument();
    expect(screen.getByLabelText("Background Color")).toBeInTheDocument();
    expect(screen.getByLabelText("Page width")).toBeInTheDocument();
  });

  it("renders text settings for heading element", () => {
    const headingElement = {
      ...defaultElement,
      type: ElementType.HEADING,
      tag: "h1",
    } as const;

    render(<PageSettings selectedElement={headingElement} updateElement={mockUpdateElement} />);

    expect(screen.getByText("Heading settings")).toBeInTheDocument();
    expect(screen.getByLabelText("Text color")).toBeInTheDocument();
    expect(screen.getByLabelText("Font size")).toBeInTheDocument();
    expect(screen.getByText("Font weight")).toBeInTheDocument();
    expect(screen.getByText("Text align")).toBeInTheDocument();
    expect(screen.getByLabelText("Content")).toBeInTheDocument();

    // Check radio options for font weight
    expect(screen.getByLabelText("Lighter")).toBeInTheDocument();
    expect(screen.getByLabelText("Normal")).toBeInTheDocument();
    expect(screen.getByLabelText("Bold")).toBeInTheDocument();

    // Check radio options for text align
    expect(screen.getByLabelText("Start")).toBeInTheDocument();
    expect(screen.getByLabelText("Center")).toBeInTheDocument();
    expect(screen.getByLabelText("End")).toBeInTheDocument();
  });

  it("handles style changes correctly", () => {
    render(<PageSettings selectedElement={defaultElement} updateElement={mockUpdateElement} />);

    const backgroundColorInput = screen.getByLabelText("Background Color");
    fireEvent.change(backgroundColorInput, { target: { value: "#ff0000" } });

    expect(mockUpdateElement).toHaveBeenCalledWith("test-id", {
      styles: { backgroundColor: "#ff0000" },
    });
  });

  it("handles attribute changes correctly", () => {
    const imageElement = {
      ...defaultElement,
      type: ElementType.IMAGE,
      tag: "img",
    } as const;

    render(<PageSettings selectedElement={imageElement} updateElement={mockUpdateElement} />);

    const imageUrlInput = screen.getByLabelText("Image URL");
    fireEvent.change(imageUrlInput, { target: { value: "https://example.com/image.jpg" } });

    expect(mockUpdateElement).toHaveBeenCalledWith("test-id", {
      attributes: { src: "https://example.com/image.jpg" },
    });
  });

  it("handles content changes correctly", () => {
    const paragraphElement = {
      ...defaultElement,
      type: ElementType.PARAGRAPH,
      tag: "p",
    } as const;

    render(<PageSettings selectedElement={paragraphElement} updateElement={mockUpdateElement} />);

    const contentTextarea = screen.getByLabelText("Content");
    fireEvent.change(contentTextarea, { target: { value: "New content" } });

    expect(mockUpdateElement).toHaveBeenCalledWith("test-id", {
      content: "New content",
    });
  });

  it("renders mobile view correctly", () => {
    mockUseBreakpoint.mockReturnValue(true);

    render(<PageSettings selectedElement={defaultElement} updateElement={mockUpdateElement} />);

    expect(screen.queryByText("Page settings")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Background Color")).toBeInTheDocument();
  });

  it("renders button settings correctly", () => {
    const buttonElement = {
      ...defaultElement,
      type: ElementType.BUTTON,
      tag: "button",
    } as const;

    render(<PageSettings selectedElement={buttonElement} updateElement={mockUpdateElement} />);

    expect(screen.getByText("Button settings")).toBeInTheDocument();
    expect(screen.getByLabelText("Button Text")).toBeInTheDocument();
    expect(screen.getByLabelText("Background Color")).toBeInTheDocument();
  });

  it("renders link settings correctly", () => {
    const linkElement = {
      ...defaultElement,
      type: ElementType.LINK,
      tag: "a",
    } as const;

    render(<PageSettings selectedElement={linkElement} updateElement={mockUpdateElement} />);

    expect(screen.getByText("Link settings")).toBeInTheDocument();
    expect(screen.getByLabelText("Link Text")).toBeInTheDocument();
    expect(screen.getByLabelText("URL")).toBeInTheDocument();
    expect(screen.getByLabelText("Text Color")).toBeInTheDocument();
  });

  it("renders nothing for invalid element type", () => {
    const invalidElement = {
      ...defaultElement,
      type: ElementType.HEADER,
    } as const;

    const { container } = render(
      <PageSettings selectedElement={invalidElement as unknown as ElementNode} updateElement={mockUpdateElement} />
    );

    expect(container.firstChild).toHaveClass(styles.container);
    expect(screen.queryByText("Header settings")).toBeInTheDocument();
    expect(screen.queryByLabelText("Background Color")).not.toBeInTheDocument();
  });
});
