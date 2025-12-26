import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";

const RoutesConfig = () => {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default RoutesConfig;
