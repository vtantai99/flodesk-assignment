import Modal from "@/components/Modal";
import { PageContent } from "@/components/PageContent";
import { PageSettings } from "@/components/PageSettings";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { ElementNode } from "@/types/dom";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import styles from "./builder.module.css";

interface BuilderProps {
  rootElement: ElementNode;
  setRootElement: (template: ElementNode | null) => void;
}

const Builder = ({ rootElement, setRootElement }: BuilderProps) => {
  const [selectedElement, setSelectedElement] = useState<ElementNode>(rootElement);
  const [isOpenSettingsPage, setIsOpenSettingsPage] = useState(true);
  const isMobileTablet = useBreakpoint(992);

  const handleElementClick = useCallback((element: ElementNode) => {
    setSelectedElement(element);
    setIsOpenSettingsPage(true);
  }, []);

  const updateElement = useCallback(
    <T extends ElementNode>(id: string, updatedFields: Partial<Omit<T, "type">>) => {
      const updateNode = (node: ElementNode): ElementNode => {
        if (node.id === id) return { ...node, ...updatedFields } as ElementNode;
        if ("children" in node && node.children) {
          return { ...node, children: node.children.map(updateNode) };
        }
        return node;
      };
      if (!rootElement) return;
      const updatedRoot = updateNode(rootElement);
      setRootElement(updatedRoot);
      setSelectedElement((prev) => ({ ...prev, ...updatedFields } as ElementNode));
    },
    [rootElement, setRootElement]
  );

  if (!rootElement) return <div>Oops! Something wrong...</div>;

  return (
    <div className={styles.container} data-testid="builder-page">
      <motion.div
        className={styles.pageContent}
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <PageContent rootNode={rootElement} selectedElement={selectedElement} onElementClick={handleElementClick} />
      </motion.div>
      {isMobileTablet ? (
        <Modal
          isOpen={isOpenSettingsPage}
          onClose={() => {
            setIsOpenSettingsPage(false);
          }}
          title={`${capitalizeFirstLetter(selectedElement.type)} settings`}
        >
          <PageSettings selectedElement={selectedElement} updateElement={updateElement} />
        </Modal>
      ) : (
        <motion.div
          className={styles.settingsPanel}
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        >
          <PageSettings selectedElement={selectedElement} updateElement={updateElement} />
        </motion.div>
      )}
    </div>
  );
};

export { Builder, type BuilderProps };
