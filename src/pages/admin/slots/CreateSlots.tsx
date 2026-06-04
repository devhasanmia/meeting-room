import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useCreateSlotsMutation } from "../../../redux/features/slots/slotsApi";
import { useGetRoomsQuery } from "../../../redux/features/room/roomApi";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { slotValidationSchema } from "../../../schemas/validation";
import { Tslot } from "../../../types/slots.type";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const CreateSlots = () => {
  const { data: getRooms, isLoading, isError } = useGetRoomsQuery(undefined);
  const [createSlots, { isLoading: isCreating }] = useCreateSlotsMutation();
  const antIcon = <LoadingOutlined style={{ fontSize: 32, color: '#4f46e5' }} spin />;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Tslot>({
    resolver: zodResolver(slotValidationSchema),
  });

  const onSubmit: SubmitHandler<Tslot> = async (formData) => {
    try {
      const res = await createSlots(formData).unwrap();
      toast.success(res.message || "Time slots created successfully");
      reset();
    } catch (error: any) {
      toast.error(error?.data?.errorMessages?.[0]?.message || "Slot creation failed");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Create Time Slots</h2>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
            Add scheduling slots for meeting rooms
          </p>
        </div>
        <Link to="/admin/slots-list">
          <button className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-indigo-600 bg-white border border-slate-200 hover:border-indigo-100 rounded-lg transition shadow-sm">
            Back to List
          </button>
        </Link>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center h-60">
          <Spin indicator={antIcon} />
        </div>
      )}

      {isError && (
        <div className="text-center py-12 text-slate-500 font-medium">
          Error loading rooms. Please check your network connection.
        </div>
      )}

      {!isLoading && !isError && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Room Select Dropdown */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Select Room <span className="text-red-500">*</span>
              </label>
              <select
                {...register("room")}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 bg-white text-slate-700 transition duration-200"
              >
                <option value="">Choose a room...</option>
                {getRooms?.data?.map((room: { _id: string; name: string }) => (
                  <option key={room._id} value={room._id}>
                    {room.name}
                  </option>
                ))}
              </select>
              {errors.room && (
                <p className="text-xs text-red-500 animate-pulse">{errors.room.message}</p>
              )}
            </div>

            <Input
              errors={errors}
              register={register("date")}
              label="Date"
              name="date"
              type="date"
            />
            <Input
              errors={errors}
              register={register("startTime")}
              label="Start Time"
              type="time"
              name="startTime"
            />
            <Input
              errors={errors}
              register={register("endTime")}
              label="End Time"
              type="time"
              name="endTime"
            />
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Button
              type="submit"
              text={isCreating ? "Creating Slots..." : "Create Slot"}
              disabled={isCreating}
              bgColor="bg-indigo-600 hover:bg-indigo-700"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateSlots;
