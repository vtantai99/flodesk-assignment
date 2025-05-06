import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MainLayout from "../MainLayout";
import { vi } from "vitest";

vi.mock("@/components/Header", () => ({
  Header: ({
    title,
    onExport,
  }: {
    title: string;
    onExport: () => void;
  }) => (
    <header>
      <h1>{title}</h1>
      <button onClick={onExport}>Export</button>
    </header>
  ),
}));

vi.mock("@/utils/renderStaticHtml", () => ({
  renderStaticHtml: vi.fn(() => "<div>static</div>"),
}));

vi.mock("@/utils/generateFullHtmlPage", () => ({
  generateFullHtmlPage: vi.fn(() => "<html>full</html>"),
}));

vi.mock("@/utils/downloadHtmlFile", () => ({
  downloadHtmlFile: vi.fn(),
}));

vi.mock("@/context/TemplateContext", () => ({
  useTemplate: () => ({
    selectedTemplate: {
      id: "template-1",
      tag: "div",
      type: "page",
      styles: {},
      children: [],
    },
  }),
}));

// 🧩 Re-import mocks after defining them to access their functions
import { renderStaticHtml } from "@/utils/renderStaticHtml";
import { generateFullHtmlPage } from "@/utils/generateFullHtmlPage";
import { downloadHtmlFile } from "@/utils/downloadHtmlFile";

describe("MainLayout", () => {
  it("renders header and children", () => {
    render(
      <MainLayout>
        <div data-testid="child">Child content</div>
      </MainLayout>
    );
    expect(screen.getByText("flodesk")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("calls export utilities when Export is clicked", async () => {
    render(<MainLayout>Test</MainLayout>);
    await userEvent.click(screen.getByText("Export"));
    expect(renderStaticHtml).toHaveBeenCalled();
    expect(generateFullHtmlPage).toHaveBeenCalledWith("<div>static</div>");
    expect(downloadHtmlFile).toHaveBeenCalledWith("template.html", "<html>full</html>");
  });
});
