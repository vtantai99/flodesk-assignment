import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./routes";

const AppRoutes = () => {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
