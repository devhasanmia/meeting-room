import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetRoomsByIdQuery } from "../redux/features/room/roomApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { bookingReduxStore } from "../redux/features/room/roomSlice";
import { useEffect } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { FiUsers, FiDollarSign, FiHash, FiLayers } from "react-icons/fi";
import { HiCheck } from "react-icons/hi";

const MeetingRoomsDetails = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const { _id } = useParams();
  const { data: roomsDetails, isLoading } = useGetRoomsByIdQuery(_id);
  const antIcon = <LoadingOutlined style={{ fontSize: 32, color: '#4f46e5' }} spin />;

  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <Spin indicator={antIcon} />
      </div>
    );
  }

  if (!roomsDetails?.data) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-slate-50 text-slate-500 font-medium">
        No room details found.
      </div>
    );
  }

  const { name, capacity, pricePerSlot, floorNo, roomNo, amenities, image } =
    roomsDetails.data;

  return (
    <div className="min-h-screen bg-slate-50 py-28 px-6">
      <div className="max-w-5xl mx-auto bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-2">
        
        {/* Left: Details Column */}
        <div className="p-8 md:p-12 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            {/* Header info */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                Room Detail
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight mt-3">
                {name}
              </h1>
            </div>

            {/* Spec list items with icons */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-100 py-6">
              <div className="flex items-center space-x-3">
                <div className="flex justify-center items-center w-10 h-10 bg-slate-50 rounded-xl text-slate-500 border border-slate-100 shadow-sm shrink-0">
                  <FiHash />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">Room No</p>
                  <p className="text-sm font-bold text-slate-700 mt-0.5">{roomNo}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex justify-center items-center w-10 h-10 bg-slate-50 rounded-xl text-slate-500 border border-slate-100 shadow-sm shrink-0">
                  <FiLayers />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">Floor No</p>
                  <p className="text-sm font-bold text-slate-700 mt-0.5">{floorNo} Floor</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex justify-center items-center w-10 h-10 bg-slate-50 rounded-xl text-slate-500 border border-slate-100 shadow-sm shrink-0">
                  <FiUsers />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">Capacity</p>
                  <p className="text-sm font-bold text-slate-700 mt-0.5">{capacity} People</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex justify-center items-center w-10 h-10 bg-slate-50 rounded-xl text-indigo-500 border border-slate-100 shadow-sm shrink-0">
                  <FiDollarSign />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">Cost per Slot</p>
                  <p className="text-sm font-bold text-indigo-600 mt-0.5">${pricePerSlot}</p>
                </div>
              </div>
            </div>

            {/* Amenities list details */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Included Amenities</h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {amenities.map((amenity: string, idx: number) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200/60 text-slate-600 text-xs px-2.5 py-1 rounded-lg font-semibold"
                  >
                    <HiCheck className="text-emerald-500" />
                    <span>{amenity}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Link to="/user/room-booking">
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
                className="w-full py-4 px-6 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95 hover:-translate-y-0.5"
              >
                Book This Room Now
              </button>
            </Link>
          </div>
        </div>

        {/* Right: Image Column */}
        <div className="relative h-64 md:h-auto min-h-[350px]">
          <img
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default MeetingRoomsDetails;
