import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useThemeStore } from "../store/themeStore";
import NavIcon from "./ui/NavIcon";
export function ModeToggle() {
  const { setTheme, theme } = useThemeStore();

  return (
    <NavIcon
      tooltip="Change Theme"
      icon={theme === "light" ? SunIcon : MoonIcon}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    />
  );
}
