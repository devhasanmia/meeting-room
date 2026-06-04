import { useForm } from "react-hook-form";
import { useParams, Link } from "react-router-dom";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import {
  useGetSlotsByIdQuery,
  useUpdateSlotsMutation,
} from "../../../redux/features/slots/slotsApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const UpdateSlot = () => {
  const { id } = useParams<{ id: string }>();
  const { data: slots, isLoading: isSlotLoading } = useGetSlotsByIdQuery(id);
  const [updateSlot, { isLoading: isUpdating }] = useUpdateSlotsMutation();
  const antIcon = <LoadingOutlined style={{ fontSize: 32, color: '#4f46e5' }} spin />;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData: any) => {
    try {
      const res = await updateSlot({ id, data: formData }).unwrap();
      toast.success(res.message || "Slot updated successfully");
      window.history.back();
    } catch (error) {
      toast.error("Failed to update time slot");
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
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Update Time Slot</h2>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
            Modify details for this room reservation slot
          </p>
        </div>
        <Link to="/admin/slots-list">
          <button className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-indigo-600 bg-white border border-slate-200 hover:border-indigo-100 rounded-lg transition shadow-sm">
            Back to List
          </button>
        </Link>
      </div>

      {isSlotLoading ? (
        <div className="flex flex-col items-center justify-center h-60">
          <Spin indicator={antIcon} />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Room display selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Room <span className="text-red-500">*</span>
              </label>
              <select
                {...register("room", {
                  required: "Room selection is required",
                })}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none bg-slate-50 text-slate-500 cursor-not-allowed"
                disabled
              >
                {room && (
                  <option key={room._id} value={room._id}>
                    {room.name}
                  </option>
                )}
              </select>
              {errors.room && (
                <p className="text-red-500 text-xs mt-1 animate-pulse">
                  {errors.room.message as string}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Input
                register={register("date", { required: "Date is required" })}
                label="Date"
                name="date"
                type="date"
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-0.5 animate-pulse">
                  {errors.date.message as string}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Input
                register={register("startTime", {
                  required: "Start Time is required",
                })}
                label="Start Time"
                type="time"
                name="startTime"
              />
              {errors.startTime && (
                <p className="text-red-500 text-xs mt-0.5 animate-pulse">
                  {errors.startTime.message as string}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Input
                register={register("endTime", {
                  required: "End Time is required",
                })}
                label="End Time"
                type="time"
                name="endTime"
              />
              {errors.endTime && (
                <p className="text-red-500 text-xs mt-0.5 animate-pulse">
                  {errors.endTime.message as string}
                </p>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Button
              text={isUpdating ? "Saving Slot..." : "Save Time Slot"}
              type="submit"
              disabled={isUpdating}
              bgColor="bg-indigo-600 hover:bg-indigo-700"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateSlot;
