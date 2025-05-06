import { JSX } from "react";

export enum ElementType {
  PAGE = "page",
  CONTAINER = "container",
  HEADER = "header",
  HEADING = "heading",
  PARAGRAPH = "paragraph",
  IMAGE = "image",
  BUTTON = "button",
  LINK = "link",
}

export type ElementNode =
  | PageNode
  | ContainerNode
  | HeaderNode
  | HeadingNode
  | ParagraphNode
  | ImageNode
  | ButtonNode
  | LinkNode;
export type AttributeByTag<T extends keyof JSX.IntrinsicElements> = JSX.IntrinsicElements[T];

export interface BaseNode<T extends keyof JSX.IntrinsicElements> {
  id: string;
  name?: string;
  tag: T;
  styles?: React.CSSProperties;
  attributes?: AttributeByTag<T>;
  content?: string;
  children?: ElementNode[];
}

export interface PageNode extends BaseNode<"div"> {
  type: ElementType.PAGE;
}

export interface ContainerNode extends BaseNode<"div" | "section" | "article"> {
  type: ElementType.CONTAINER;
}

export interface HeaderNode extends BaseNode<"header"> {
  type: ElementType.HEADER;
}

export interface HeadingNode extends BaseNode<"h1" | "h2" | "h3" | "h4" | "h5" | "h6"> {
  type: ElementType.HEADING;
}

export interface ParagraphNode extends BaseNode<"p"> {
  type: ElementType.PARAGRAPH;
}

export interface ImageNode extends BaseNode<"img"> {
  type: ElementType.IMAGE;
}

export interface ButtonNode extends BaseNode<"button"> {
  type: ElementType.BUTTON;
}

export interface LinkNode extends BaseNode<"a"> {
  type: ElementType.LINK;
}
