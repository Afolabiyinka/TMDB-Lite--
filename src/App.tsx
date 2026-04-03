import { Toaster } from "sonner";
import RoutesConfig from "./routes/routes-config";
import { useThemeStore } from "./app/store/themeStore";

const App = () => {
  const { theme } = useThemeStore();
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
