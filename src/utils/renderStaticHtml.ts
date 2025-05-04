import { ElementNode } from "@/types/dom";

export const renderStaticHtml = (node: ElementNode): string => {
  const { tag, styles, attributes, content, children } = node;

  // Convert styles object to string
  const styleString = styles
    ? ` style="${Object.entries(styles)
        .map(([key, value]) => `${key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}:${value}`)
        .join(";")}"`
    : "";

  // Convert attributes object to string
  const attrString = attributes
    ? Object.entries(attributes)
        .map(([key, value]) => {
          if (typeof value === "boolean") return value ? key : "";
          return `${key}="${String(value)}"`;
        })
        .filter(Boolean)
        .join(" ")
    : "";

  const openingTag = `<${tag}${attrString ? " " + attrString : ""}${styleString}>`;

  const closingTag = `</${tag}>`;

  if (tag === "img") {
    return `<${tag}${attrString ? " " + attrString : ""}${styleString} />`;
  }

  const innerHTML = children && children.length > 0 ? children.map(renderStaticHtml).join("") : content || "";

  return `${openingTag}${innerHTML}${closingTag}`;
};
