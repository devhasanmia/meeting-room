import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import NotFound from "../pages/error/NotFound";
import MainLayout from "../components/layout/MainLayout";
import MeetingRooms from "../pages/MeetingRooms";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Home from "../pages/Home";
import Dashboard from "../pages/users/Dashboard";
import UserLayout from "../components/layout/UserLayout";
import MyBooking from "../pages/users/MyBooking";
import MeetingRoomsDetails from "../pages/MeetingRoomsDetails";
import Booking from "../pages/Booking";
import BookingSummary from "../pages/BookingSummary";

const router = createBrowserRouter([
  {
    path: "/user/",
    element: <UserLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
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
        element: <Booking/>
      },
      {
        path: "room-booking/checkout",
        element: <BookingSummary/>
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
