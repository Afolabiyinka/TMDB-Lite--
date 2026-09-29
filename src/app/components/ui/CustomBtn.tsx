import { Button } from "@material-tailwind/react";
import type { ComponentType, ReactNode } from "react";

interface IconComponentProps {
  className?: string;
  size?: number | string;
  strokeWidth?: number;
}

interface Props {
  text?: string;
  children?: ReactNode;
  onClick?: () => void;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "solid" | "outline" | "gradient" | "ghost";
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error";
  icon?: ComponentType<IconComponentProps>;
  className?: string;
  isPill?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const CustomBtn = ({
  text,
  children,
  color = "primary",
  size = "lg",
  variant = "solid",
  onClick,
  icon: Icon,
  className = "",
  isPill = true,
  type = "button",
  disabled = false,
}: Props) => {
  const label = children ?? text ?? "Submit";

  return (
    <Button
      variant={variant}
      size={size}
      color={color}
      onClick={onClick}
      isPill={isPill}
      type={type}
      disabled={disabled}
      className={`p-3 px-11 rounded-2xl ${className}`.trim()}
    >
      {Icon && <Icon className="mr-2" size={18} />}
      <span>{label}</span>
    </Button>
  );
};

export default CustomBtn;
