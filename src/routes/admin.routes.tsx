import Dashboard from "../pages/admin/Dashboard";
import CreateRoom from "../pages/admin/CreateRoom";
import RoomList from "../pages/admin/RoomList";
import BookingsList from "../pages/admin/BookingsList";
import CreateSlots from "../pages/admin/CreateSlots";
import SlotsList from "../pages/admin/slots/SlotsList";
import UserList from "../pages/admin/UserList";
const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    name: "Room Management",
    children: [
      {
        name: "Create Room",
        path: "create-room",
        element: <CreateRoom />,
      },
      {
        name: "Room List",
        path: "room-list",
        element: <RoomList />,
      },
      // {
      //   name: "Room Update",
      //   path: "room-update/:id",
      //   element: <UpdateRoom />,
      // },
    ],
  },
  {
    name: "Slots Management",
    children: [
      {
        name: "Create Slots",
        path: "create-slots",
        element: <CreateSlots />,
      },
      {
        name: "Slots List",
        path: "slots-list",
        element: <SlotsList />,
      },
      // {
      //   name: "Slots Update",
      //   path: "slots-update/:id",
      //   element: <UpdateSlot />,
      // },
    ],
  },
  {
    name: "Booking Management",
    children: [
      {
        name: "Booking List",
        path: "booking-list",
        element: <BookingsList />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "User List",
        path: "user-list",
        element: <UserList />,
      },
    ],
  },
];

export default adminPaths;
