import styles from "./Button.module.css";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  const { label, disabled, className, onClick } = props;

  return (
    <button className={`${styles.button} ${className}`} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export { Button, type ButtonProps };
