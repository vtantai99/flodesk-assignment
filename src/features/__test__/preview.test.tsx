import { render, screen, fireEvent } from "@testing-library/react";
import { ElementNode, ElementType } from "@/types/dom";
import React from "react";
import { vi } from "vitest";
import { Preview } from "../preview";

vi.mock("@/components/PageContent", () => ({
  PageContent: ({ rootNode }: { rootNode: ElementNode }) => (
    <div data-testid={`page-content-${rootNode.id}`}>Content: {rootNode.id}</div>
  ),
}));

vi.mock("@/components/TemplateCard", () => ({
  TemplateCard: ({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) => (
    <div data-testid="template-card" onClick={onClick}>
      <div>{label}</div>
      {children}
    </div>
  ),
}));

const templates: ElementNode[] = [
  {
    id: "template-1",
    tag: "div",
    type: ElementType.PAGE,
    styles: {},
    children: [],
  },
  {
    id: "template-2",
    tag: "div",
    type: ElementType.PAGE,
    styles: {},
    children: [],
  },
];

describe("Preview component", () => {
  it("renders all templates with content", () => {
    const setSelectedTemplate = vi.fn();

    render(<Preview templates={templates} setSelectedTemplate={setSelectedTemplate} />);

    templates.forEach((template) => {
      expect(screen.getByTestId(`page-content-${template.id}`)).toBeInTheDocument();
    });

    expect(screen.getAllByTestId("template-card")).toHaveLength(2);
  });

  it("calls setSelectedTemplate when a card is clicked", () => {
    const setSelectedTemplate = vi.fn();
    render(<Preview templates={templates} setSelectedTemplate={setSelectedTemplate} />);

    fireEvent.click(screen.getAllByTestId("template-card")[0]);
    expect(setSelectedTemplate).toHaveBeenCalledWith(templates[0]);
  });
});
