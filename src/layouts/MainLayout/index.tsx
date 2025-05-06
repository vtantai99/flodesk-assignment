import { Header } from "@/components/Header";
import { PropsWithChildren } from "react";
import styles from "./MainLayout.module.css";
import { motion } from "framer-motion";
import { useTemplate } from "@/context/TemplateContext";
import { renderStaticHtml } from "@/utils/renderStaticHtml";
import { generateFullHtmlPage } from "@/utils/generateFullHtmlPage";
import { downloadHtmlFile } from "@/utils/downloadHtmlFile";

const MainLayout = ({ children }: PropsWithChildren) => {
  const { selectedTemplate } = useTemplate();

  const handleExport = () => {
    try {
      if (!selectedTemplate) return;

      const staticHtml = renderStaticHtml({
        ...selectedTemplate,
        styles: { ...selectedTemplate.styles, minHeight: "100vh" },
      });
      const fullHtmlPage = generateFullHtmlPage(staticHtml);
      downloadHtmlFile("template.html", fullHtmlPage);
    } catch (error) {
      console.error("Error during export:", error);
    }
  };

  return (
    <>
      <Header title="flodesk" onExport={handleExport} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.main}
      >
        {children}
      </motion.main>
    </>
  );
};

export default MainLayout;
