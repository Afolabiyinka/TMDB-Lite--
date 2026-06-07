import { useState } from "react";
import { MoonIcon, SunIcon, LaptopIcon } from "@phosphor-icons/react"
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
          <span>
            <IconButton
              color="secondary"
              variant="ghost"
              isCircular={true}
              size="lg"
              onClick={() => setIsOpen(true)}
            >
              {theme === "light" ? <SunIcon size={25} /> : <MoonIcon size={25} />}
            </IconButton>
          </span>
        </Menu.Trigger>

        {isOpen && (
          <Menu.Content className="z-50" color="secondary">
            <Menu.Item onClick={() => handleClick("light")}>
              <SunIcon className="mr-2 h-[18px] w-[18px]" /> Light
            </Menu.Item>

            <Menu.Item onClick={() => handleClick("dark")}>
              <MoonIcon className="mr-2 h-[18px] w-[18px]" /> Dark
            </Menu.Item>

            <Menu.Item onClick={() => handleClick("system")}>
              <LaptopIcon className="mr-2 h-[18px] w-[18px]" /> System
            </Menu.Item>
          </Menu.Content>
        )}
      </Menu>
    </div>
  );
}
