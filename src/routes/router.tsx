import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import NotFound from "../pages/error/NotFound";
import MainLayout from "../components/layout/MainLayout";
import MeetingRooms from "../pages/MeetingRooms";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Home from "../pages/Home";
import UserLayout from "../components/layout/UserLayout";
import MyBooking from "../pages/users/MyBooking";
import MeetingRoomsDetails from "../pages/MeetingRoomsDetails";
import Booking from "../pages/Booking";
import BookingSummary from "../pages/BookingSummary";
import AdminLayout from "../components/layout/AdminLayout";
import CreateRoom from "../pages/admin/CreateRoom";
import RoomList from "../pages/admin/RoomList";
import Dashboard from "../pages/admin/Dashboard";
import EditRoom from "../pages/admin/EditRoom";
import BookingsList from "../pages/admin/BookingsList";
import UserList from "../pages/admin/UserList";
import CreateSlots from "../pages/admin/CreateSlots";
import SlotsList from "../pages/admin/SlotsList";

const router = createBrowserRouter([
  {
    path: "/user/",
    element: <UserLayout />,
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
    path: "/admin/dashboard",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "create-room",
        element: <CreateRoom />,
      },
      {
        path: "room-list",
        element: <RoomList />,
      },
      {
        path: "room-edit/:id",
        element: <EditRoom />,
      },
      {
        path: "booking-list",
        element: <BookingsList />,
      },
      {
        path: "user-list",
        element: <UserList />,
      },
      {
        path: "create-slots",
        element: <CreateSlots />,
      },
      {
        path: "slots-list",
        element: <SlotsList />,
      },
    ],
  },
]);

export default router;
