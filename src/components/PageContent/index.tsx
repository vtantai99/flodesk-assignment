/* eslint-disable @typescript-eslint/no-unused-vars */
import { ElementNode } from "@/types/dom";
import { createElement, CSSProperties, JSX, MouseEvent, ReactNode } from "react";
import pageContentStyles from "./PageContent.module.css";

interface PageContentProps {
  rootNode: ElementNode;
  isPreview?: boolean;
  selectedElement?: ElementNode | null;
  onElementClick?: (node: ElementNode) => void;
}

const PageContent = (props: PageContentProps) => {
  const { rootNode, isPreview, onElementClick } = props;

  const adjustedStyles = {
    ...rootNode.styles,
  };

  const renderNode = (node: ElementNode): ReactNode => {
    const { tag, attributes, styles, content, children } = node;

    const stylesWithActive: CSSProperties = {
      ...styles,
    };

    const handleClick = (e: MouseEvent) => {
      if (!isPreview) {
        e.stopPropagation();
      }
      onElementClick?.(node);
    };

    const Tag = tag as keyof JSX.IntrinsicElements;

    if (children && children.length > 0) {
      return createElement(
        Tag,
        {
          key: node.id,
          style: stylesWithActive,
          ...attributes,
          onClick: handleClick,
          className: !isPreview ? pageContentStyles.editableElement : "",
        },
        children.map(renderNode)
      );
    }

    if (content !== undefined) {
      return createElement(
        Tag,
        {
          key: node.id,
          style: stylesWithActive,
          ...attributes,
          onClick: handleClick,
          className: !isPreview ? pageContentStyles.editableElement : "",
        },
        content || "Click to edit"
      );
    }

    return createElement(Tag, {
      key: node.id,
      style: stylesWithActive,
      ...attributes,
      onClick: handleClick,
      className: !isPreview ? pageContentStyles.editableElement : "",
    });
  };

  return renderNode({ ...rootNode, styles: adjustedStyles });
};

export { PageContent, type PageContentProps };
