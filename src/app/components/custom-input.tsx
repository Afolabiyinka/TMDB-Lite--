import type { ReactNode } from "react";

interface Props {
  placeholder: string;
  icon?: ReactNode;
  onChange?: (val: string) => void;
  type: "number" | "text" | "email" | "password" | "search";
  id?: string;
  value?: string;
  className?: string;
}

const CustomInput = ({
  placeholder,
  icon,
  onChange,
  type,
  id,
  value,
  className,
}: Props) => {
  return (
    <div
      className={`flex items-center h-[3.2rem] w-full border border-gray-300 rounded-full px-3 gap-2 focus-within:ring-2 focus-within:ring-black transition ${className}`}
    >
      {icon && <span className="text-gray-400">{icon}</span>}
      <input
        placeholder={placeholder}
        className="flex-1 h-full bg-transparent outline-none text-sm"
        type={type}
        id={id}
        value={value}
        required
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};

export default CustomInput;
