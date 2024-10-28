import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import UpdateSlot from "../pages/admin/slots/UpdateSlot";
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
const CreateRoom = lazy(() => import("../pages/admin/CreateRoom"));
const RoomList = lazy(() => import("../pages/admin/RoomList"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const EditRoom = lazy(() => import("../pages/admin/EditRoom"));
const BookingsList = lazy(() => import("../pages/admin/BookingsList"));
const UserList = lazy(() => import("../pages/admin/UserList"));
const CreateSlots = lazy(() => import("../pages/admin/CreateSlots"));
const  SlotsList = lazy(() => import("../pages/admin/slots/SlotsList"));
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
        element: <SlotsList/>,
      },
      {
        path: "slots-list/slots-edit/:id",
        element: <UpdateSlot />,
      },
    ],
  },
]);

export default router;
