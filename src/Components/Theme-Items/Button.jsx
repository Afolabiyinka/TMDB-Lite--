import { Switch, Typography } from "@material-tailwind/react";
import { useState } from "react";

export default function SwitchWithLabel() {
  const [isDark, setIsDark] = useState(true);
  return (
    <div className="flex items-center gap-2">
      <Switch id="switch" onClick={() => setIsDark(false)} checked={isDark} />
      <Typography
        as="label"
        htmlFor="switch"
        className="cursor-pointer text-foreground"
      >
        {isDark ? "Dark Mode" : "Light Mode"}
      </Typography>
    </div>
  );
}
