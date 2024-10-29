import Booking from "../pages/Booking";
import BookingSummary from "../pages/BookingSummary";
import MeetingRoomsDetails from "../pages/MeetingRoomsDetails";
import MyBooking from "../pages/users/MyBooking";

const authenticatedUserPaths = [
  {
    path: "meeting-rooms-details/:_id",
    element: <MeetingRoomsDetails />,
  },
  {
    name: "Room Booking",
    path: "room-booking",
    element: <Booking />,
  },
  {
    name: "Checkout",
    path: "room-booking/checkout",
    element: <BookingSummary />,
  },
  {
    name: "My Booking",
    path: "my-booking",
    element: <MyBooking />,
  },
];

export default authenticatedUserPaths;
