import { PageContent } from "@/components/PageContent";
import { TemplateCard } from "@/components/TemplateCard";
import { ElementNode } from "@/types/dom";
import styles from "./preview.module.css";

type PreviewProps = {
  templates: ElementNode[];
  setSelectedTemplate: (template: ElementNode | null) => void;
};

const Preview = ({ templates, setSelectedTemplate }: PreviewProps) => {
  return (
    <div className={styles.templateListContainer}>
      <div className={styles.templateListContent}>
        {templates.map((template) => (
          <TemplateCard key={template.id} label={template.name ?? ""} onClick={() => setSelectedTemplate(template)}>
            <PageContent rootNode={template} isPreview />
          </TemplateCard>
        ))}
      </div>
    </div>
  );
};

export { Preview, type PreviewProps };
