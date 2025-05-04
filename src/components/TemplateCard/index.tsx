import { PropsWithChildren } from "react";
import styles from "./TemplateCard.module.css";

interface TemplateCardProps extends PropsWithChildren {
  className?: string;
  label: string;
  onClick?: () => void;
}

const TemplateCard = (props: TemplateCardProps) => {
  const { children, className, label, onClick } = props;

  return (
    <div onClick={onClick} className={`${styles.templateCard} ${className ?? ""}`}>
      <div className={styles.templatePreview}>
        <div className={styles.templatePreviewContent}>{children}</div>
      </div>
      <div className={styles.templateLabel}>
        <p className={styles.labelText}>{label}</p>
      </div>
    </div>
  );
};

export { TemplateCard, type TemplateCardProps };
