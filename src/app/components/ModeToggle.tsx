import { useState } from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useThemeStore, type Theme } from "../store/themeStore";

import { Menu, IconButton } from "@material-tailwind/react";

export function ModeToggle() {
  const { setTheme, theme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(true);

  function handleClick(theme: Theme) {
    setTheme(theme);
    setIsOpen(false);
  }
  return (
    <div className="lg:grid">
      <Menu>
        <Menu.Trigger>
          <IconButton
            color="secondary"
            variant="solid"
            isCircular={true}
            size="lg"
            onClick={() => setIsOpen(true)}
          >
            {theme === "light" ? <Sun /> : <Moon />}
          </IconButton>
        </Menu.Trigger>

        {isOpen && (
          <Menu.Content className="z-50" color="secondary">
            <Menu.Item onClick={() => handleClick("light")}>
              <Sun className="mr-2 h-[18px] w-[18px]" /> Light
            </Menu.Item>

            <Menu.Item onClick={() => handleClick("dark")}>
              <Moon className="mr-2 h-[18px] w-[18px]" /> Dark
            </Menu.Item>

            <Menu.Item onClick={() => handleClick("system")}>
              <Laptop className="mr-2 h-[18px] w-[18px]" /> System
            </Menu.Item>
          </Menu.Content>
        )}
      </Menu>
    </div>
  );
}
