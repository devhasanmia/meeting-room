import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetRoomsByIdQuery } from "../redux/features/room/roomApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { bookingReduxStore } from "../redux/features/room/roomSlice";
import { useEffect } from "react";

const MeetingRoomsDetails = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }
  const { _id } = useParams();
  const {
    data: roomsDetails,
    isLoading,
    isError,
    error,
  } = useGetRoomsByIdQuery(_id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error?.data?.message || "Something went wrong."}
      </div>
    );
  }

  if (!roomsDetails?.data) {
    return (
      <div className="flex justify-center items-center h-screen">
        No room details found.
      </div>
    );
  }

  const { name, capacity, pricePerSlot, floorNo, roomNo, amenities } =
    roomsDetails.data;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">{name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 bg-white shadow-lg p-6 rounded-lg">
        <div>
          <div className="mb-4">
            <span className="font-semibold text-lg">Room Number:</span> {roomNo}
          </div>
          <div className="mb-4">
            <span className="font-semibold text-lg">Capacity:</span> {capacity}{" "}
            people
          </div>
          <div className="mb-4">
            <span className="font-semibold text-lg">Price Per Slot:</span> $
            {pricePerSlot}
          </div>
          <div className="mb-4">
            <span className="font-semibold text-lg">Floor Number:</span>{" "}
            {floorNo}
          </div>
          <div className="mb-4">
            <span className="font-semibold text-lg">Amenities:</span>{" "}
            {amenities.join(", ")}
          </div>
          <Link to={"/room-booking"}>
            <button
              onClick={() => {
                dispatch(
                  bookingReduxStore({
                    user: user.userId,
                    room: roomsDetails.data._id,
                    date: null,
                    slots: null,
                  })
                );
              }}
              className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 mt-6 transition-all"
            >
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoomsDetails;
