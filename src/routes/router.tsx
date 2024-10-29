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
const MyBooking = lazy(() => import("../pages/users/MyBooking"));
const MeetingRoomsDetails = lazy(() => import("../pages/MeetingRoomsDetails"));
const Booking = lazy(() => import("../pages/Booking"));
const BookingSummary = lazy(() => import("../pages/BookingSummary"));
const AdminLayout = lazy(() => import("../components/layout/AdminLayout"));

import adminPaths from "./admin.routes";
import Dashboard from "../pages/admin/Dashboard";
import ProtectedRoute from "../components/layout/ProtectedRoute";
const router = createBrowserRouter([
  {
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "my-booking",
        element: <MyBooking />,
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
        path: "meeting-rooms",
        element: <MeetingRooms />,
      },
      {
        path: `/meeting-rooms/meeting-rooms-details/:_id`,
        element: <MeetingRoomsDetails />,
      },
      {
        path: "room-booking",
        element: <Booking />,
      },
      {
        path: "room-booking/checkout",
        element: <BookingSummary />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
    ],
  },
  {
    path: "/signup",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/login",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },

  {
    path: "*",
    element: <MainLayout />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
    ],
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
]);

export default router;
