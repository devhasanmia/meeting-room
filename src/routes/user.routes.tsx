import Booking from "../pages/Booking";
import BookingSummary from "../pages/BookingSummary";
import MyBooking from "../pages/users/MyBooking";

const authenticatedUserPaths = [
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
