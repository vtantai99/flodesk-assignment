import { renderStaticHtml } from "../renderStaticHtml";
import { ElementType, PageNode, ContainerNode, ImageNode, HeadingNode } from "@/types/dom";

describe("renderStaticHtml", () => {
  it("should render a page node correctly", () => {
    const pageNode: PageNode = {
      id: "1",
      tag: "div",
      type: ElementType.PAGE,
      content: "This is a page",
      styles: { color: "red" },
    };

    const result = renderStaticHtml(pageNode);

    expect(result).toBe(`<div style="color:red">This is a page</div>`);
  });

  it("should render a container node correctly", () => {
    const containerNode: ContainerNode = {
      id: "2",
      tag: "section",
      type: ElementType.CONTAINER,
      content: "This is a container",
      styles: { padding: "20px" },
    };

    const result = renderStaticHtml(containerNode);

    expect(result).toBe(`<section style="padding:20px">This is a container</section>`);
  });

  it("should render an image node correctly", () => {
    const imageNode: ImageNode = {
      id: "5",
      tag: "img",
      type: ElementType.IMAGE,
      attributes: { src: "image.jpg", alt: "Image" },
    };

    const result = renderStaticHtml(imageNode);

    expect(result).toBe(`<img src="image.jpg" alt="Image" />`);
  });

  it("should render a node with children correctly", () => {
    const headingNode: HeadingNode = {
      id: "3",
      tag: "h1",
      type: ElementType.HEADING,
      content: "Hello World",
      styles: { fontSize: "2em" },
      children: [
        {
          id: "4",
          tag: "p",
          type: ElementType.PARAGRAPH,
          content: "This is a child",
        },
      ],
    };

    const result = renderStaticHtml(headingNode);

    expect(result).toBe(`<h1 style="font-size:2em"><p>This is a child</p></h1>`);
  });

  it("should render a node without styles correctly", () => {
    const nodeWithoutStyles: PageNode = {
      id: "6",
      tag: "div",
      type: ElementType.PAGE,
      content: "No styles here",
    };

    const result = renderStaticHtml(nodeWithoutStyles);

    expect(result).toBe(`<div>No styles here</div>`);
  });
});
