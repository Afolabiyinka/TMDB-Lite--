import { IconButton, Input } from "@material-tailwind/react";
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  placeholder: string;
  icon?: ReactNode;
  onChange?: (val: string) => void;
  type: "number" | "text" | "email" | "password" | "search";
  id?: string;
  value?: string;
  className?: string;
  searchClear?: () => void
}

const CustomInput = ({
  placeholder,
  icon,
  onChange,
  type,
  id,
  value,
  className, searchClear
}: Props) => {
  return (
    <div
      className={`flex items-center h-[3.2rem] w-full border border-gray-300 overflow-hidden rounded-full px-3 gap-2 focus-within:ring-2 focus-within:ring-black transition ${className}`}
    >
      {icon && <span className="">{icon}</span>}
      <Input
        placeholder={placeholder}
        className="flex-1 h-full border-none shadow-none ring-0 bg-transparent outline-none text-sm"
        type={type}
        id={id}
        value={value}
        required

        onChange={(e) => onChange?.(e.target.value)}
      />
      {type === "text" && <IconButton variant="ghost" isCircular onClick={searchClear}>
        <X className="h-4 w-5" /></IconButton>}
    </div>
  );
};

export default CustomInput;
