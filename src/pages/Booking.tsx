import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";
import { useAvailabilitysQuery } from "../redux/features/room/roomApi";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import { TBookingData } from "../types/booking.type";
import { toast } from "sonner";
import { bookingReduxStore } from "../redux/features/room/roomSlice";
import { FiCalendar, FiClock } from "react-icons/fi";

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
    <div className="flex items-center justify-center py-6 min-h-[400px]">
      <div className="w-full max-w-xl bg-white space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Select Date & Time Slot</h2>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
            Choose your preferred timing for booking
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Date Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <FiCalendar className="text-indigo-500" />
              <span>Select Date</span>
            </label>
            <select
              className="w-full px-4 py-3 rounded-lg border border-slate-200 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 bg-white text-slate-700 transition duration-200"
              onChange={(e) => {
                setSelectedDate(e.target.value);
              }}
              value={selectedDate}
            >
              <option value="">Choose a date...</option>
              {availableSlots?.data
                ?.filter((item: any) => item?.room?._id === bookingRoom)
                .map((item: any) => (
                  <option
                    key={item?._id}
                    value={item.date}
                    disabled={item.isBooked && item.isDelete === true}
                  >
                    {item.date} {item.isBooked ? "(Already Booked Date)" : "(Available)"}
                  </option>
                ))}
            </select>
          </div>

          {/* Time Slot Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <FiClock className="text-indigo-500" />
              <span>Select Time Slot</span>
            </label>
            <select
              disabled={isError || isLoading || !selectedDate}
              {...register("slotId")}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 bg-white text-slate-700 transition duration-200 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed"
            >
              <option value="">Choose a slot...</option>
              {isLoading ? (
                <option>Loading slots...</option>
              ) : isError ? (
                <option>No slots available for this date.</option>
              ) : (
                availableSlots?.data
                  ?.filter((item: any) => item?.room?._id === bookingRoom)
                  .map((item: any) => (
                    <option
                      disabled={item.isBooked || item.isDelete === true}
                      key={item?._id}
                      value={item?._id}
                    >
                      {item.startTime} - {item.endTime} {item.isBooked ? "(Booked)" : ""}
                    </option>
                  ))
              )}
            </select>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <Button
              text="Proceed to Checkout"
              type="submit"
              disabled={
                !selectedDate ||
                !bookingRoom ||
                !booking ||
                !watch("slotId") ||
                isLoading ||
                isError
              }
              bgColor="bg-indigo-600 hover:bg-indigo-700"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;
