import { ROUTE_PATHS } from "@/constants/routes";
import { ElementNode } from "@/types/dom";
import { createElement, CSSProperties, JSX, MouseEvent, ReactNode } from "react";
import { useLocation } from "react-router";
import pageContentStyles from "./PageContent.module.css";

interface PageContentProps {
  rootNode: ElementNode;
  isPreview?: boolean;
  selectedElement?: ElementNode | null;
  onElementClick?: (node: ElementNode) => void;
}

const PageContent = (props: PageContentProps) => {
  const { rootNode, isPreview, onElementClick } = props;
  const location = useLocation();
  const isBuilderPage = location.pathname.startsWith(ROUTE_PATHS.BUILDER);

  const adjustedStyles = {
    ...rootNode.styles,
    ...(isPreview ? { minHeight: "auto" } : {}),
  };

  const renderNode = (node: ElementNode): ReactNode => {
    const { tag, attributes, styles, content, children } = node;

    // const isElementSelected = node.id === selectedElement?.id;

    const stylesWithActive: CSSProperties = {
      ...styles,
    };

    const handleClick = (e: MouseEvent) => {
      if (isBuilderPage) {
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
          className: pageContentStyles.editableElement,
        },
        children.map(renderNode)
      );
    }

    if (content) {
      return createElement(
        Tag,
        {
          key: node.id,
          style: stylesWithActive,
          ...attributes,
          onClick: handleClick,
          className: pageContentStyles.editableElement,
        },
        content
      );
    }

    return createElement(Tag, {
      key: node.id,
      style: stylesWithActive,
      ...attributes,
      onClick: handleClick,
      className: pageContentStyles.editableElement,
    });
  };

  return renderNode({ ...rootNode, styles: adjustedStyles });
};

export { PageContent, type PageContentProps };
