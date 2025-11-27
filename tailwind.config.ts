import type { Config } from "tailwindcss";
import { mtConfig } from "@material-tailwind/react";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Your source files
    "./index.html", // Your HTML entry
    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}", // Material Tailwind
  ],
  plugins: [mtConfig],
};

export default config;
