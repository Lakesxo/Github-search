import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import "./button.css";

interface ButtonProps {
  name: React.ReactNode;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  variant: "primary" | "secondary";
  isLoading?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  name,
  prefixIcon,
  suffixIcon,
  variant,
  isLoading,
  disabled,
  ariaLabel,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      className={variant === "primary" ? "primary" : "secondary"}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {prefixIcon && <span>{prefixIcon}</span>}
      {name}
      {suffixIcon && <span>{suffixIcon}</span>}
      {isLoading && (
        <span>
          <LoadingOutlined data-testid="loading-icon" spin />
        </span>
      )}
    </button>
  );
};

export default Button;
