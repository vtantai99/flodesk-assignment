import { useTemplate } from "@/context/TemplateContext";
import { downloadHtmlFile } from "@/utils/downloadHtmlFile";
import { generateFullHtmlPage } from "@/utils/generateFullHtmlPage";
import { renderStaticHtml } from "@/utils/renderStaticHtml";
import { Button } from "../Button";
import styles from "./header.module.css";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const { selectedTemplate, setSelectedTemplate } = useTemplate();

  const handleExport = () => {
    if (!selectedTemplate) return;

    const staticHtml = renderStaticHtml({
      ...selectedTemplate,
      styles: { ...selectedTemplate.styles, minHeight: "100vh" },
    });
    const fullHtmlPage = generateFullHtmlPage(staticHtml);
    downloadHtmlFile("template.html", fullHtmlPage);
  };

  const handleLogoClick = () => {
    if (selectedTemplate) {
      setSelectedTemplate(null);
    }
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title} onClick={handleLogoClick}>{title}</h1>
      {selectedTemplate && <Button label="Export" onClick={handleExport} />}
    </header>
  );
};

export { Header, type HeaderProps };
