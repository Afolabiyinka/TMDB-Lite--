import { useState } from "react";
import { Moon, Sun, Laptop } from "lucide-react";

import {
  Menu,
  MenuContent,
  MenuTrigger,
  IconButton,
} from "@material-tailwind/react";

import { useTheme } from "./ThemeContext";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(true);

  function handleClick(theme) {
    setTheme(theme);
    setIsOpen(false);
  }
  return (
    <div className="lg:grid">
      <Menu className="mt-3">
        <MenuTrigger>
          <IconButton
            color="secondary"
            variant="solid"
            isCircular={true}
            onClick={() => setIsOpen(true)}
          >
            {theme === "light" ? (
              <Sun className="h-[1.2rem] w-[1.2rem] active:rotate-90 scale-100 transition-all " />
            ) : (
              <Moon className=" h-[1.2rem] w-[1.2rem] active:rotate-45 scale-100 transition-all" />
            )}
          </IconButton>
        </MenuTrigger>

        {isOpen && (
          <MenuContent className="flex flex-col cursor-pointer mt-3">
            <span
              className="flex justify-between cursor-pointer active:bg-gray-500 p-2 rounded-lg"
              onClick={() => handleClick("light")}
            >
              Light <Sun />
            </span>

            <span
              className="flex justify-between cursor-pointer active:bg-gray-500 p-2 rounded-lg"
              onClick={() => handleClick("dark")}
            >
              Dark <Moon />
            </span>

            <span
              className="flex justify-between cursor-pointer active:bg-gray-500 p-2 rounded-lg"
              onClick={() => handleClick("system")}
            >
              System <Laptop />
            </span>
          </MenuContent>
        )}
      </Menu>
    </div>
  );
}
