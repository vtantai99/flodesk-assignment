/* eslint-disable @typescript-eslint/no-unused-vars */
import Modal from "@/components/Modal";
import { PageContent } from "@/components/PageContent";
import { TemplateCard } from "@/components/TemplateCard";
import { ROUTE_PATHS } from "@/constants/routes";
import styles from "@/features/home/home.module.css";
import { useBuilderContext } from "@/hooks/useBuilderContext";
import { ElementNode, ElementType } from "@/types/dom";
import { useState } from "react";
import { useNavigate } from "react-router";

const template2: ElementNode = {
  id: "container-1",
  type: ElementType.CONTAINER,
  tag: "div",
  styles: {
    maxWidth: "100%",
    minHeight: "100%",
    margin: "0 auto",
    backgroundColor: "#dbf2f5",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "16px",
    padding: "0 24px",
  },
  children: [
    // {
    //   id: "image-1",
    //   type: ElementType.IMAGE,
    //   tag: "img",
    //   styles: {
    //     display: "block",
    //     margin: "0 auto 16px",
    //     width: "200px",
    //     height: "200px",
    //     borderRadius: "8px",
    //   },
    //   attributes: {
    //     src: "https://picsum.photos/200",
    //     alt: "Placeholder Image",
    //   },
    // },
    {
      id: "heading-1",
      type: ElementType.HEADING,
      tag: "h1",
      styles: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginBottom: "16px",
        textAlign: "center",
      },
      content: "LOREM IPSUM LODOR SIT AMET",
    },
    {
      id: "paragraph-1",
      type: ElementType.PARAGRAPH,
      tag: "p",
      styles: {
        color: "#374151",
        marginBottom: "16px",
        textAlign: "center",
      },
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: "paragraph-2",
      type: ElementType.PARAGRAPH,
      tag: "p",
      styles: {
        color: "#374151",
        textAlign: "center",
      },
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ],
};

const template1: ElementNode = {
  id: "template2",
  type: ElementType.PAGE,
  tag: "div",
  styles: {
    backgroundColor: "#ffffff",
    maxWidth: "800px",
    margin: "0 auto",
  },
  children: [
    {
      id: "image1",
      type: ElementType.IMAGE,
      tag: "img",
      styles: {
        width: "100%",
      },
      attributes: {
        src: "https://via.placeholder.com/800x400",
        alt: "Hero Image",
      },
    },
    {
      id: "heading1",
      type: ElementType.HEADING,
      tag: "h1",
      styles: {
        fontSize: "32px",
        color: "#000000",
      },
      content: "Welcome to Our Site",
    },
    {
      id: "paragraph1",
      type: ElementType.PARAGRAPH,
      tag: "p",
      styles: {
        fontSize: "16px",
        color: "#333333",
      },
      content: "This is a simple hero template for your website.",
    },
  ],
};


const Home = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<ElementNode | null>(null);
  const [isOpenTemplateModal, setIsOpenTemplateModal] = useState(false);

  const { setRootElement } = useBuilderContext();

  const navigateToBuilder = (rootElement: ElementNode) => {
    setRootElement(rootElement);
    navigate(ROUTE_PATHS.BUILDER);
  };

  return (
    <div className={styles.container}>
      {!selectedTemplate && (
        <Modal isOpen={!isOpenTemplateModal} onClose={() => setIsOpenTemplateModal(false)}>
          <div className={styles.templateList}>
            <TemplateCard label="Simple Hero" onClick={() => navigateToBuilder(template1)}>
              <PageContent rootNode={template1} isPreview />
            </TemplateCard>
            <TemplateCard label="Centered Content" onClick={() => navigateToBuilder(template2)}>
              <PageContent rootNode={template2} isPreview />
            </TemplateCard>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Home;
