import React from "react";
import styles from "./RadioGroupField.module.css";

interface Option {
  label: string;
  value: string;
}

interface RadioGroupFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  options: Option[];
  name: string;
  value: string;
  onChange: (value: string) => void;
}

const RadioGroupField: React.FC<RadioGroupFieldProps> = ({
  label,
  options,
  name,
  value,
  onChange,
  ...rest
}) => {
  return (
    <div className={styles.radioGroupContainer}>
      <p className={styles.groupLabel}>{label}</p>
      <div className={styles.optionsWrapper}>
        {options.map((option) => {
          const id = `${name}-${option.value}`;
          return (
            <label key={option.value} htmlFor={id} className={styles.option}>
              <input
                id={id}
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                className={styles.radio}
                {...rest}
              />
              <span className={styles.optionLabel}>{option.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export { RadioGroupField, type RadioGroupFieldProps };
