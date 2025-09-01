import React from "react";

type ButtonVariant =
  | "btn-primary"
  | "btn-secondary"
  | "btn-neutral"
  | "btn-accent-deep"
  | "btn-accent-success"
  | "btn-accent-danger";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "btn-primary",
  className = "",
  icon,
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
            ${variant} px-4 py-2 font-medium shadow-md transition duration-200
            flex items-center justify-center gap-2 rounded-md
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            ${className}
        `}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
};

export default Button;