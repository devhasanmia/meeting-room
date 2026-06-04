import {
  useAvailabilityByIdQuery,
  useGetRoomsByIdQuery,
} from "../redux/features/room/roomApi";
import { useAppSelector } from "../redux/hooks";
import { Divider, Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCreateBookingsMutation } from "../redux/features/booking/bookingApi";

const BookingSummary = () => {
  const booking = useAppSelector(
    (state) => state.booking.room && state.booking.user
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!booking) {
      navigate("/meeting-rooms");
    }
  }, [booking, navigate]);

  const roomId = useAppSelector((state) => state.booking.room);
  const bookingSlot = useAppSelector((state) => state.booking.slots);
  const roomBookingR = useAppSelector((state) => state.booking);
  const [roomBooking, { isLoading }] = useCreateBookingsMutation();

  const { data: slotsDetails } = useAvailabilityByIdQuery(bookingSlot?.[0]);
  const {
    date = "",
    startTime = "00:00",
    endTime = "00:00",
    isBooked = false,
  } = slotsDetails?.data || {};

  const { data: roomsDetails } = useGetRoomsByIdQuery(roomId);
  const {
    name = "",
    roomNo = 0,
    floorNo = 0,
    capacity = 0,
    pricePerSlot = 0,
    amenities = [],
  } = roomsDetails?.data || {};

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const startTimeInMinutes = startHour * 60 + startMinute;
  const endTimeInMinutes = endHour * 60 + endMinute;
  const totalDuration = endTimeInMinutes - startTimeInMinutes;

  const hour = totalDuration / 60;
  const totalAmount = pricePerSlot * hour;

  const handleSubmit = async () => {
    const res = await roomBooking(roomBookingR);
    const paymentUrl = res?.data?.data?.payment_url;
    if (paymentUrl) {
      window.location.replace(paymentUrl);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-6">
      <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-lg relative overflow-hidden">
        {/* Receipt Header Overlay */}
        <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>

        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Booking Summary</h2>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Review your booking information
          </p>
        </div>

        <div className="space-y-4 text-sm font-medium">
          {/* Room Details */}
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <span className="text-slate-400">Room Name</span>
            <span className="text-slate-800 font-bold">{name}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <span className="text-slate-400">Room Number</span>
            <span className="text-slate-800 font-semibold">Room {roomNo}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <span className="text-slate-400">Floor</span>
            <span className="text-slate-800 font-semibold">{floorNo} Floor</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <span className="text-slate-400">Capacity</span>
            <span className="text-slate-800 font-semibold">{capacity} People</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <span className="text-slate-400">Date</span>
            <span className="text-slate-800 font-semibold">{date}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <span className="text-slate-400">Time Window</span>
            <span className="text-slate-800 font-semibold">{startTime} - {endTime}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <span className="text-slate-400">Price / Slot</span>
            <span className="text-slate-800 font-semibold">${pricePerSlot}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <span className="text-slate-400">Booking Status</span>
            <span>
              {!isBooked ? (
                <Tag icon={<CheckCircleOutlined />} color="success" className="font-semibold rounded-md border-emerald-100">
                  Available
                </Tag>
              ) : (
                <Tag icon={<CloseCircleOutlined />} color="error" className="font-semibold rounded-md border-rose-100">
                  Booked
                </Tag>
              )}
            </span>
          </div>
          
          {/* Amenities Details */}
          {amenities.length > 0 && (
            <div className="flex flex-col gap-1.5 pb-4">
              <span className="text-slate-400">Amenities</span>
              <div className="flex flex-wrap gap-1">
                {amenities.map((item: string, index: number) => (
                  <span key={index} className="text-xs bg-slate-50 border border-slate-200/60 text-slate-600 px-2 py-0.5 rounded-md font-semibold">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          <Divider className="!my-6 border-dashed" />

          {/* Pricing Total */}
          <div className="flex justify-between items-center text-lg font-bold text-slate-800">
            <span>Total Cost</span>
            <span className="text-indigo-600 text-2xl">${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <Button
            onClick={handleSubmit}
            text={isLoading ? "Processing..." : "Confirm & Pay Now"}
            bgColor="bg-indigo-600 hover:bg-indigo-700"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
