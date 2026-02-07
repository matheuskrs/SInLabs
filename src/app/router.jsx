import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
const ErrorPage = lazy(() => import("~/pages/ErrorPage/ErrorPage"));
const RootLayout = lazy(() => import("~/layouts/RootLayout/RootLayout"));
const AuthLayout = lazy(() => import("~/layouts/Auth/AuthLayout"));
const LoginPage = lazy(() => import("~/pages/Login/LoginPage"));
const AccessManagementLayout = lazy(() => import("~/layouts/AccessManagement/AccessManagementLayout"));
const AccessManagement = lazy(() => import("~/pages/AccessManagement/AccessManagement"));
const LaboratoriesLayout = lazy(() => import("~/layouts/Laboratories/LaboratoriesLayout"));
const Laboratories = lazy(() => import("~/pages/Laboratories/Laboratories"));
const UsersLayout = lazy(() => import("~/layouts/Users/UsersLayout"));
const Users = lazy(() => import("~/pages/Users/Users"));
const SystemsLayout = lazy(() => import("~/layouts/Systems/SystemsLayout"));
const Systems = lazy(() => import("~/pages/Systems/Systems"));
const AssociationsLayout = lazy(() => import("~/layouts/Associations/AssociationsLayout"));
const Associations = lazy(() => import("~/pages/Associations/Associations"));

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AuthLayout />,
        children: [{ index: true, element: <LoginPage /> }],
      },
      {
        path: "/access",
        element: <AccessManagementLayout />,
        children: [{ index: true, element: <AccessManagement /> }],
      },
      {
        path: "/laboratories",
        element: <LaboratoriesLayout />,
        children: [{ index: true, element: <Laboratories /> }],
      },
      {
        path: "/users",
        element: <UsersLayout />,
        children: [{ index: true, element: <Users /> }],
      },
      {
        path: "/systems",
        element: <SystemsLayout />,
        children: [{ index: true, element: <Systems /> }],
      },
      {
        path: "/associations",
        element: <AssociationsLayout />,
        children: [{ index: true, element: <Associations /> }],
      },
    ],
  },
]);
