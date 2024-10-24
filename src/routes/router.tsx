import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import NotFound from "../pages/error/NotFound";
import MainLayout from "../components/layout/MainLayout";
import MeetingRooms from "../pages/MeetingRooms";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home/>
      },
      {
        path: "meeting-rooms",
        element: <MeetingRooms />,
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
]);

export default router;
