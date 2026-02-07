import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const ErrorPage = lazy(() => import("~/pages/ErrorPage/ErrorPage"));
const RootLayout = lazy(() => import("~/layouts/RootLayout/RootLayout"));

const AuthLayout = lazy(() => import("~/layouts/Auth/AuthLayout"));
const AppLayout = lazy(() => import("~/layouts/App/AppLayout"));

const LoginPage = lazy(() => import("~/pages/Login/LoginPage"));
const ProfileManagement = lazy(() => import("~/pages/ProfileManagement/ProfileManagement"));
const Laboratories = lazy(() => import("~/pages/Laboratories/Laboratories"));
const Users = lazy(() => import("~/pages/Users/Users"));
const Systems = lazy(() => import("~/pages/Systems/Systems"));
const Associations = lazy(() => import("~/pages/Associations/Associations"));
const Downloads = lazy(() => import("~/pages/Downloads/Downloads"));
const Feed = lazy(() => import("~/pages/Feed/Feed"));

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
        element: <AppLayout />,
        children: [
          { path: "/accessProfiles", element: <ProfileManagement /> },
          { path: "/laboratories", element: <Laboratories /> },
          { path: "/users", element: <Users /> },
          { path: "/systems", element: <Systems /> },
          { path: "/associations", element: <Associations /> },
          { path: "/downloads", element: <Downloads /> },
          { path: "/feed", element: <Feed /> },
        ],
      },
    ],
  },
]);
