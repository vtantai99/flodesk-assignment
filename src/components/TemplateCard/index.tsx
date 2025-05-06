import { PropsWithChildren } from "react";
import styles from "./TemplateCard.module.css";
import { motion } from "framer-motion";

interface TemplateCardProps extends PropsWithChildren {
  className?: string;
  label: string;
  onClick?: () => void;
}

const TemplateCard = (props: TemplateCardProps) => {
  const { children, className, label, onClick } = props;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className={`${styles.templateCard} ${className ?? ""}`}
    >
      <div className={styles.templatePreview}>
        <div className={styles.templatePreviewContent}>{children}</div>
      </div>
      <div className={styles.templateLabel}>
        <p className={styles.labelText}>{label}</p>
      </div>
    </motion.div>
  );
};

export { TemplateCard, type TemplateCardProps };
