import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";
import { useAvailabilitysQuery } from "../redux/features/room/roomApi";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import { TBookingData } from "../types/booking.type";
import { toast } from "sonner";
import { bookingReduxStore } from "../redux/features/room/roomSlice";

const Booking = () => {
  const booking = useAppSelector(
    (state) => state.booking.room && state.booking.user
  );
  const dispatch = useAppDispatch();
  const bookingRoom = useAppSelector((state) => state.booking.room);
  const navigate = useNavigate();

  useEffect(() => {
    if (!booking) {
      navigate("/meeting-rooms");
    }
  }, [booking, navigate]);

  const { register, handleSubmit, reset, watch } = useForm<TBookingData>();
  const [selectedDate, setSelectedDate] = useState("");
  const {
    data: availableSlots,
    isError,
    isLoading,
    refetch,
  } = useAvailabilitysQuery({ date: selectedDate, room: bookingRoom });

  useEffect(() => {
    if (selectedDate && bookingRoom) {
      refetch();
    }
  }, [selectedDate, bookingRoom, refetch]);

  const onSubmit: SubmitHandler<TBookingData> = async (data) => {
    try {
      dispatch(
        bookingReduxStore({
          date: selectedDate,
          user: booking,
          slots: [data.slotId],
          room: bookingRoom,
        })
      );
      navigate("/user/room-booking/checkout", { replace: true });
      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occurred during booking.");
    }
  };

  return (
    <div className=" flex items-center justify-center p-5 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <select
            className="border-green-400 ring-green-500 mt-1 block w-full p-3 border rounded-md shadow-sm focus:outline-none"
            onChange={(e) => {
              setSelectedDate(e.target.value);
            }}
          >
            <option value="">Select Date</option>
            {availableSlots?.data
              ?.filter((item: any) => item?.room?._id === bookingRoom)
              .map((item: any) => (
                <option
                  className={`p-10 ${
                    item.isBooked ? "text-red-500 p-6" : "text-green-500"
                  }`}
                  key={item?._id}
                  value={item.date}
                  disabled={item.isBooked && item.isDelete === true}
                >
                  {item.date}{" "}
                  {item.isBooked ? "Already booked This Date" : "Available"}
                  {item.isDelete === true ? " (Deleted)" : ""}
                </option>
              ))}
          </select>
          <select
            disabled={isError || isLoading}
            {...register("slotId")}
            className="border-green-400 ring-green-500 mt-1 block w-full p-3 border rounded-md shadow-sm focus:outline-none"
          >
            <option>Select the Slot</option>
            {isLoading ? (
              <option>Loading slots...</option>
            ) : isError ? (
              <option>Not available slots for the selected date.</option>
            ) : (
              availableSlots?.data
                ?.filter(
                  (item: any) =>
                    item?.room?._id === bookingRoom
                )
                .map((item: any) => (
                  <option
                    disabled={item.isBooked || item.isDelete === true}
                    key={item?._id}
                    value={item?._id}
                    className={`p-10 ${
                      item.isBooked ? "text-red-500 p-6" : "text-green-500"
                    }`}
                  >
                    Start Time: {item.startTime} | End Time: {item.endTime}{" "}
                    {item.isBooked ? "Already Booked" : ""}
                    {item.isDelete === true? " (Deleted)" : ""}
                  </option>
                ))
            )}
          </select>
          <Button
            text="Checkout"
            type="submit"
            disabled={
              !selectedDate ||
              !bookingRoom ||
              !booking ||
              !watch("slotId") ||
              isLoading ||
              isError
            }
          />
        </form>
      </div>
    </div>
  );
};

export default Booking;
