import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { routeGenerator } from "../utils/routesGenerator";
const Signup = lazy(() => import("../pages/auth/Signup"));
const Login = lazy(() => import("../pages/auth/Login"));
const NotFound = lazy(() => import("../pages/error/NotFound"));
const MainLayout = lazy(() => import("../components/layout/MainLayout"));
const MeetingRooms = lazy(() => import("../pages/MeetingRooms"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const Home = lazy(() => import("../pages/Home"));
const UserLayout = lazy(() => import("../components/layout/UserLayout"));
const AdminLayout = lazy(() => import("../components/layout/AdminLayout"));

import adminPaths from "./admin.routes";
import Dashboard from "../pages/admin/Dashboard";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import authenticatedUserPaths from "./user.routes";
import AccessDenied from "../pages/error/AccessDenied";
const router = createBrowserRouter([
  {
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <UserLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(authenticatedUserPaths),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        children: routeGenerator(adminPaths),
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "meeting-rooms",
        element: <MeetingRooms />,
      },
      {
        path: "access-denied",
        element: <AccessDenied />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
