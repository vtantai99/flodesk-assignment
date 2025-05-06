import { ElementNode } from "@/types/dom";
import { PageContent } from "../PageContent";
import { TemplateCard } from "../TemplateCard";
import styles from "./previewSection.module.css";

type PreviewSectionProps = {
  templates: ElementNode[];
  setSelectedTemplate: (template: ElementNode | null) => void;
};

const PreviewSection = ({ templates, setSelectedTemplate }: PreviewSectionProps) => {
  return (
    <div className={styles.templateListContainer}>
      <div className={styles.templateListContent}>
        {templates.map((template) => (
          <TemplateCard label="Simple Hero" onClick={() => setSelectedTemplate(template)}>
            <PageContent rootNode={template} isPreview />
          </TemplateCard>
        ))}
      </div>
    </div>
  );
};

export { PreviewSection, type PreviewSectionProps };
