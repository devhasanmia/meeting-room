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
  const { data: roomsDetails } = useGetRoomsByIdQuery(_id);

  if (!roomsDetails?.data) {
    return (
      <div className="flex justify-center items-center ">
        No room details found.
      </div>
    );
  }

  const { name, capacity, pricePerSlot, floorNo, roomNo, amenities, image } =
    roomsDetails.data;
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">{name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 bg-white shadow-lg p-6 rounded-lg">
        <div className="flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <span className="font-semibold text-lg">Room Number:</span>{" "}
              {roomNo}
            </div>
            <div className="mb-4">
              <span className="font-semibold text-lg">Capacity:</span>{" "}
              {capacity} people
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
          </div>
          <Link to={"/user/room-booking"}>
            <button
              onClick={() => {
                dispatch(
                  bookingReduxStore({
                    user: user.userId,
                    room: roomsDetails?.data?._id,
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
        <div className="flex justify-center items-center">
          <img
            src={image}
            alt={name}
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default MeetingRoomsDetails;
