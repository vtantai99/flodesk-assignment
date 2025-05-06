import { useTemplate } from "@/context/TemplateContext";
import { Button } from "../Button";
import styles from "./header.module.css";

interface HeaderProps {
  title: string;
  onExport: () => void;
}

const Header = ({ title, onExport }: HeaderProps) => {
  const { selectedTemplate, setSelectedTemplate } = useTemplate();

  const handleLogoClick = () => {
    if (selectedTemplate) {
      setSelectedTemplate(null);
    }
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title} onClick={handleLogoClick}>
        {title}
      </h1>
      {selectedTemplate && <Button label="Export" onClick={onExport} />}
    </header>
  );
};

export { Header, type HeaderProps };
