import { useLocation, useNavigate } from "react-router";
import { Button } from "../Button";
import styles from "./header.module.css";
import { renderStaticHtml } from "@/utils/renderStaticHtml";
import { getLocalStorage } from "@/utils/localStorage";
import { ROUTE_PATHS } from "@/constants/routes";
import { BUILDER_PAGE_CONTENT } from "@/constants/localStorage";
import { ElementNode } from "@/types/dom";
import { generateFullHtmlPage } from "@/utils/generateFullHtmlPage";
import { downloadHtmlFile } from "@/utils/downloadHtmlFile";

interface HeaderProps {
  title: string;
}

const Header = (props: HeaderProps) => {
  const { title } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const isBuilderPage = location.pathname.startsWith(ROUTE_PATHS.BUILDER);

  const navigateToHome = () => {
    navigate(ROUTE_PATHS.HOME);
  };

  const handleExport = () => {
    const builderPageContent = getLocalStorage<ElementNode>(BUILDER_PAGE_CONTENT);
    if (!builderPageContent) {
      alert("No content to export");
      return;
    }
    const staticHtml = renderStaticHtml(builderPageContent);
    const fullHtmlPage = generateFullHtmlPage(staticHtml);
    downloadHtmlFile("template.html", fullHtmlPage);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title} onClick={navigateToHome}>
        {title}
      </h1>
      {isBuilderPage && <Button label="Export" onClick={handleExport} />}
    </header>
  );
};

export { Header, type HeaderProps };
