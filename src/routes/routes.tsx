import { ROUTE_PATHS } from "@/constants/routes";
import { BuilderProvider } from "@/contexts/BuilderContext";
import MainLayout from "@/layouts/MainLayout";
import { lazy } from "react";
import { RouteObject } from "react-router";

const Home = lazy(() => import("@/pages/Home"));
const Builder = lazy(() => import("@/pages/Builder"));

const routes: RouteObject[] = [
  {
    path: ROUTE_PATHS.HOME,
    Component: () => (
      <BuilderProvider>
        <MainLayout />
      </BuilderProvider>
    ),
    children: [
      {
        path: "",
        Component: Home,
      },
      {
        path: ROUTE_PATHS.BUILDER,
        Component: Builder,
      },
    ],
  },
];

export default routes;
