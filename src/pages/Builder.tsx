import { PageContent } from "@/components/PageContent";
import SettingsPanel from "@/components/SettingsPanel";
import styles from "@/features/builder/builder.module.css";
import { useBuilderContext } from "@/hooks/useBuilderContext";
import { ElementNode } from "@/types/dom";
import { useState, useCallback } from "react";

const Builder = () => {
  // Destructure context and state
  const { rootElement, setRootElement } = useBuilderContext();
  const [selectedElement, setSelectedElement] = useState<ElementNode | null>(null);

  // Handle element selection
  const handleElementClick = useCallback((element: ElementNode) => {
    setSelectedElement(element);
  }, []);

  // Update an element in the tree by id
  const updateElement = useCallback(<T extends ElementNode>(id: string, updatedFields: Partial<Omit<T, "type">>) => {
    const updateNode = (node: ElementNode): ElementNode => {
      if (node.id === id) {
        return { ...node, ...updatedFields } as ElementNode;
      }
      if ("children" in node && node.children) {
        const updatedChildren = node.children.map(updateNode);
        return { ...node, children: updatedChildren };
      }
      return node;
    };
    if (!rootElement) return;
    const updatedRootElement = updateNode(rootElement);
    setRootElement(updatedRootElement);
    setSelectedElement((prev) => (prev ? { ...prev, ...updatedFields } as ElementNode : null));
  }, [rootElement, setRootElement]);

  // Handle missing root element
  if (rootElement === null) {
    return <div>Oops! Something wrong...</div>;
  }

  return (
    <div className={styles.container}>
      {/* Main page content */}
      <div className={styles.pageContent}>
        <PageContent
          rootNode={rootElement}
          selectedElement={selectedElement}
          onElementClick={handleElementClick}
        />
      </div>
      {/* Settings panel for editing selected element */}
      <div className={styles.settingsPanel}>
        <SettingsPanel
          selectedElement={selectedElement}
          updateElement={updateElement}
        />
      </div>
    </div>
  );
};

export default Builder;
