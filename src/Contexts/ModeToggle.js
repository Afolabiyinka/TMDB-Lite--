import React, { useState } from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { Button } from "../Components/Theme-Items/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../Components/Theme-Items/Dropdown";
import { useTheme } from "../Contexts/ThemeContext";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleThemeChange = (theme) => {
    setTheme(theme);
    setIsOpen(false);
  };

  return (
    <div className="hidden lg:grid">
      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={handleToggle}>
          <Button size="icon">
            {theme === "light" ? (
              <Sun className="h-[1.2rem] w-[1.2rem] active:rotate-90 scale-100 transition-all " />
            ) : (
              <Moon className=" h-[1.2rem] w-[1.2rem] active:rotate-45 scale-100 transition-all" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" isOpen={isOpen}>
          <DropdownMenuItem onClick={() => handleThemeChange("light")}>
            Light <Sun />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
            Dark <Moon />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleThemeChange("system")}>
            System <Laptop />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
