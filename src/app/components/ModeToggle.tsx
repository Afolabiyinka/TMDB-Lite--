import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useThemeStore } from "../store/themeStore";
import { motion } from "framer-motion";
export function ModeToggle() {
  const { setTheme, theme } = useThemeStore();

  return (
    <motion.div
      // whileHover={{ y: -2 }}
      whileTap={{ scale: 0.8 }}
      className="cursor-pointer"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <SunIcon size={30} weight="regular" className="" />
      ) : (
        <MoonIcon size={30} weight="regular" />
      )}
    </motion.div>
  );
}
