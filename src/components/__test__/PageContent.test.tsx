import { render, screen, fireEvent } from "@testing-library/react";
import { PageContent } from "../PageContent";
import { ElementNode, ElementType } from "@/types/dom";
import { vi } from "vitest";

describe("PageContent", () => {
  const baseNode: ElementNode = {
    id: "root",
    tag: "div",
    type: ElementType.PAGE,
    styles: { backgroundColor: "#fff" },
    children: [],
  };

  it("renders content correctly when content is present", () => {
    const nodeWithContent: ElementNode = {
      ...baseNode,
      content: "Hello World",
    };

    render(<PageContent rootNode={nodeWithContent} />);

    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("renders nested children", () => {
    const nodeWithChildren: ElementNode = {
      ...baseNode,
      children: [
        {
          id: "child1",
          tag: "p",
          type: ElementType.PARAGRAPH,
          styles: {},
          attributes: {},
          content: "Child Text",
        },
      ],
    };

    render(<PageContent rootNode={nodeWithChildren} />);

    expect(screen.getByText("Child Text")).toBeInTheDocument();
  });

  it("calls onElementClick when clicked (not in preview mode)", () => {
    const handleClick = vi.fn();

    const clickableNode: ElementNode = {
      ...baseNode,
      content: "Click Me",
    };

    render(
      <PageContent rootNode={clickableNode} onElementClick={handleClick} />
    );

    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledWith(clickableNode);
  });

  it("does not call onElementClick when in preview mode", () => {
    const handleClick = vi.fn();

    const clickableNode: ElementNode = {
      ...baseNode,
      content: "Preview Mode",
    };

    render(
      <PageContent
        rootNode={clickableNode}
        isPreview={true}
        onElementClick={handleClick}
      />
    );

    fireEvent.click(screen.getByText("Preview Mode"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("adds editable class when not in preview mode", () => {
    const editableNode: ElementNode = {
      ...baseNode,
      content: "Editable",
    };

    render(<PageContent rootNode={editableNode} />);

    const element = screen.getByText("Editable");
    expect(element.className).toContain("editableElement");
  });

  it("does not add editable class in preview mode", () => {
    const previewNode: ElementNode = {
      ...baseNode,
      content: "Non-editable",
    };

    render(<PageContent rootNode={previewNode} isPreview={true} />);

    const element = screen.getByText("Non-editable");
    expect(element.className).not.toContain("editableElement");
  });
});
