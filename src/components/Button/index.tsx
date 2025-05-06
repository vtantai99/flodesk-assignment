import styles from "./Button.module.css";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  "data-testid"?: string;
}

const Button = (props: ButtonProps) => {
  const { label, disabled, className, onClick, "data-testid": testId } = props;

  return (
    <button
      className={`${styles.button} ${className ?? ""}`}
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
    >
      {label}
    </button>
  );
};

export { Button, type ButtonProps };
