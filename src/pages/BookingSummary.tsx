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
    <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-lg bg-white mt-4 mb-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Booking Summary
      </h2>
      <Divider className="my-4" />
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-semibold">Date:</span>
          <span>{date}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Room Name:</span>
          <span>{name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Room No:</span>
          <span>{roomNo}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Floor No:</span>
          <span>{floorNo}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Capacity:</span>
          <span>{capacity}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Price per Slot:</span>
          <span>${pricePerSlot}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Amenities:</span>
          <span>{amenities.join(", ")}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Start Time:</span>
          <span>{startTime}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">End Time:</span>
          <span>{endTime}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Booking Status:</span>
          <span>
            {!isBooked ? (
              <Tag icon={<CheckCircleOutlined />} color="green">
                Available
              </Tag>
            ) : (
              <Tag icon={<CloseCircleOutlined />} color="red">
                Booked
              </Tag>
            )}
          </span>
        </div>
        <Divider className="my-4" />
        <div className="flex justify-between text-lg font-semibold">
          <span>Total Amount:</span>
          <span className="text-blue-600">${totalAmount.toFixed(2)}</span>
        </div>
      </div>
      <div>
        <Button
          onClick={handleSubmit}
          text={
            isLoading ? "Loading" : "Proceed to Payment And Confirm Booking"
          }
        />
      </div>
    </div>
  );
};

export default BookingSummary;
