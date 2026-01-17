import Footer from "./pages/nav/Footer";
import NavBar from "./pages/nav/NavBar";
import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
import ScrollBtn from "./components/ScrollBtn";
import { useThemeStore } from "./store/themeStore";

const Layout = () => {
  const { theme } = useThemeStore();
  const storedUser = localStorage.getItem("TmdbUser");
  if (!storedUser) {
    return <Navigate to={"/auth/login"} replace />;
  }

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
    <div className="flex flex-col justify-center items-center w-full h-full">
      <NavBar />
      <Outlet />
      <ScrollBtn />
      <Footer />
    </div>
  );
};

export default Layout;
