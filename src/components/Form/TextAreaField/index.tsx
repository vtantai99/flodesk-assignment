import styles from "./TextareaField.module.css";

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextareaField = (props: TextareaFieldProps) => {
  const { label, id, ...rest } = props;

  const textareaId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={styles.textareaContainer}>
      <label htmlFor={textareaId} className={styles.label}>
        {label}
      </label>
      <textarea id={textareaId} className={styles.textarea} {...rest} />
    </div>
  );
};

export { TextareaField, type TextareaFieldProps };
