import { render, screen, fireEvent } from "@testing-library/react";
import { Builder } from "../builder";
import { ElementNode, ElementType } from "@/types/dom";
import { vi } from "vitest";

vi.mock("@/components/PageContent", () => ({
  PageContent: ({
    rootNode,
    selectedElement,
    onElementClick,
  }: {
    rootNode: ElementNode;
    selectedElement: ElementNode;
    onElementClick: (element: ElementNode) => void;
  }) => (
    <div>
      <div data-testid="page-content">{rootNode.id}</div>
      <button data-testid="element" onClick={() => onElementClick(rootNode)}>
        Select Element: {selectedElement.id}
      </button>
    </div>
  ),
}));

vi.mock("@/components/PageSettings", () => ({
  PageSettings: ({
    selectedElement,
    updateElement,
  }: {
    selectedElement: ElementNode;
    updateElement: (id: string, updatedFields: Partial<Omit<ElementNode, "type">>) => void;
  }) => (
    <div data-testid="settings">
      Settings for: {selectedElement.id}
      <button onClick={() => updateElement(selectedElement.id, { tag: "section" })}>Update</button>
    </div>
  ),
}));

vi.mock("@/components/Modal", () => ({
  default: ({
    isOpen,
    children,
  }: {
    isOpen: boolean;
    children: React.ReactNode;
  }) => (isOpen ? <div data-testid="modal">{children}</div> : null),
}));

vi.mock("@/hooks/useBreakpoint", () => ({
  useBreakpoint: () => false,
}));

const rootElement: ElementNode = {
  id: "root-1",
  type: ElementType.PAGE,
  tag: "div",
  styles: {},
  children: [],
};

describe("Builder component", () => {
  it("renders PageContent and PageSettings", () => {
    const setRootElement = vi.fn();
    render(<Builder rootElement={rootElement} setRootElement={setRootElement} />);
    expect(screen.getByTestId("page-content")).toHaveTextContent("root-1");
    expect(screen.getByTestId("settings")).toBeInTheDocument();
  });

  it("calls setRootElement and updates element on click", () => {
    const setRootElement = vi.fn();
    render(<Builder rootElement={rootElement} setRootElement={setRootElement} />);
    fireEvent.click(screen.getByTestId("element"));
    fireEvent.click(screen.getByText("Update"));
    expect(setRootElement).toHaveBeenCalledWith(expect.objectContaining({ tag: "section" }));
  });
});
