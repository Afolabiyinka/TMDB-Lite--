import React, { useRef, useEffect } from "react";

// DropdownMenu component
export const DropdownMenu = ({ children }) => {
  return (
    <div className="relative inline-block text-left transition-all">
      {children}
    </div>
  );
};

// DropdownMenuTrigger component
export const DropdownMenuTrigger = ({ children, asChild, onClick }) => {
  return asChild ? (
    React.cloneElement(children, { onClick })
  ) : (
    <button onClick={onClick} className="transition-all">
      {children}
    </button>
  );
};

// DropdownMenuContent component
export const DropdownMenuContent = ({ children, align = "start", isOpen }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        // Close the dropdown when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      ref={contentRef}
      className={`absolute ${
        align === "end" ? "right-0" : "left-0"
      } mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex="-1"
    >
      {children}
    </div>
  );
};

// DropdownMenuItem component
export const DropdownMenuItem = ({ children, onClick }) => {
  return (
    <div
      className="  py-2 text-sm text-gray-700 flex justify-between px-2 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
      role="menuitem"
      tabIndex="-1"
      onClick={onClick}
    >
      {children}
    </div>
  );
};
