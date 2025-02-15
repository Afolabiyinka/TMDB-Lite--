import { ModeToggle } from "../Contexts/ModeToggle";

import { useTheme } from "../Contexts/ThemeContext";
import { useState } from "react";

const NavBar = () => {
  // const { setTheme } = useTheme();
  // const [icon, setIcon] = useState(true);

  return (
    <div className={`h-[10vh] {theme} flex items-center justify-between px-4`}>
      <h1>TDMB Lite ✨</h1>
      <ModeToggle />
    </div>
  );
};

export default NavBar;
