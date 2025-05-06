import React from "react";
import styles from "./InputField.module.css";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputField = (props: InputFieldProps) => {
  const { label, id, ...rest } = props;

  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <input id={inputId} className={styles.input} {...rest} />
    </div>
  );
};

export { InputField, type InputFieldProps };
