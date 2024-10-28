import { Divider } from "antd";
import Input from "../../components/ui/Input";
import { useGetRoomsQuery } from "../../redux/features/room/roomApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateSlotsMutation } from "../../redux/features/slots/slotsApi";
import { toast } from "sonner";

type Tslot = {
  room: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked?: boolean;
};

const slotValidationSchema = z.object({
  room: z.string(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  startTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Invalid start time format (HH:MM)"),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid end time format (HH:MM)"),
  isBooked: z.boolean().optional(),
});

const CreateSlots = () => {
  const { data: getRooms, isLoading, isError } = useGetRoomsQuery(undefined);
  const [createSlots] = useCreateSlotsMutation();
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
      toast.success(res.message);
      reset();
    } catch (error: any) {
      toast.error(error.data.errorMessages[0].message);
    }
  };

  return (
    <div>
      <div className="bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <Divider style={{ fontSize: "25px" }}>Create Slots</Divider>

          {isLoading && <div>Loading...</div>}
          {isError && <div>Error fetching rooms</div>}

          {!isLoading && !isError && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="block text-sm font-medium text-gray-700">
                Room
                <span className="text-red-500">*</span>
              </label>
              <select
                {...register("room")}
                required
                className="mt-1 block w-full p-3 border rounded-md shadow-sm focus:outline-none border-green-400 ring-green-500"
              >
                {getRooms?.data?.map((room: { _id: string; name: string }) => (
                  <option key={room._id} value={room._id}>
                    {room.name}
                  </option>
                ))}
              </select>
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
              <button
                type="submit"
                className="mt-4 text-white bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-lg"
              >
                Create Slot
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateSlots;
