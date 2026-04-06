import { Toaster } from "sonner";
import RoutesConfig from "./routes/routes-config";
import { useThemeStore } from "./app/store/themeStore";
import { useEffect } from "react";

const App = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      document.body.classList.add(systemTheme);

      return;
    }
  }, [theme]);
  return (
    <div className="font-[Inter]">
      <RoutesConfig />
      <Toaster
        theme={theme}
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "100px",
          },
        }}
        richColors
      />
    </div>
  );
};

export default App;
