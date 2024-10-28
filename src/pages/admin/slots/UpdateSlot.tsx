import { Divider } from "antd";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import {
  useGetSlotsByIdQuery,
  useUpdateSlotsMutation,
} from "../../../redux/features/slots/slotsApi";
import { useEffect } from "react";
import { toast } from "sonner";

const UpdateSlot = () => {
  const { id } = useParams<{ id: string }>();
  const { data: slots, isLoading: isSlotLoading } = useGetSlotsByIdQuery(id);
  const [updateSlot] = useUpdateSlotsMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData: any) => {
    try {
      const res = await updateSlot({ id, data: formData }).unwrap();
      toast.success(res.message);
      reset();
      window.history.back();
    } catch (error) {
      console.log(error)
    }
  };

  const { room, date, startTime, endTime } = slots?.data || {};

  useEffect(() => {
    if (slots?.data) {
      reset({
        room: room?._id,
        date,
        startTime,
        endTime,
      });
    }
  }, [slots, reset]);

  return (
    <div>
      <div className="bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <Divider style={{ fontSize: "25px" }}>Update Slot</Divider>
          {isSlotLoading ? (
            <div>Loading...</div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="block text-sm font-medium text-gray-700">
                Room
                <span className="text-red-500">*</span>
              </label>
              <select
                {...register("room", {
                  required: "Room selection is required",
                })}
                className="mt-1 block w-full p-3 border rounded-md shadow-sm focus:outline-none border-green-400 ring-green-500"
              >
                {room && (
                  <option key={room._id} value={room._id}>
                    {room.name}
                  </option>
                )}
              </select>
              {errors.room && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.room.message as string}
                </p>
              )}

              <Input
                register={register("date", { required: "Date is required" })}
                label="Date"
                name="date"
                type="date"
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.date.message as string}
                </p>
              )}

              <Input
                register={register("startTime", {
                  required: "Start Time is required",
                })}
                label="Start Time"
                type="time"
                name="startTime"
              />
              {errors.startTime && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.startTime.message as string}
                </p>
              )}

              <Input
                register={register("endTime", {
                  required: "End Time is required",
                })}
                label="End Time"
                type="time"
                name="endTime"
              />
              {errors.endTime && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.endTime.message as string}
                </p>
              )}

              <Button text="Update and Save" type="submit" />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateSlot;
