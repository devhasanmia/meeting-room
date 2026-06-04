import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  useGetRoomByIdAndUpdateMutation,
  useGetRoomsByIdQuery,
} from "../../../redux/features/room/roomApi";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const UpdateRoom = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetRoomsByIdQuery(id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      roomNo: 0,
      floorNo: 0,
      capacity: 0,
      pricePerSlot: 0,
    },
  });
  const [updateRoom, { isLoading: updateRoomLoading }] =
    useGetRoomByIdAndUpdateMutation();
  const antIcon = <LoadingOutlined style={{ fontSize: 32, color: '#4f46e5' }} spin />;

  useEffect(() => {
    if (data) {
      reset({
        name: data.data.name,
        roomNo: data.data.roomNo,
        floorNo: data.data.floorNo,
        capacity: data.data.capacity,
        pricePerSlot: data.data.pricePerSlot,
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: any) => {
    try {
      await updateRoom({ id, data: formData }).unwrap();
      toast.success("Room updated successfully!");
      window.history.back();
    } catch (error) {
      toast.error("Failed to update room");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-60">
        <Spin indicator={antIcon} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-slate-500 font-medium">
        Error fetching room data. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Update Room</h2>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
            Modify details for this conference workspace
          </p>
        </div>
        <Link to="/admin/room-list">
          <button className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-indigo-600 bg-white border border-slate-200 hover:border-indigo-100 rounded-lg transition shadow-sm">
            Back to List
          </button>
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Input
            label="Room Name"
            name="name"
            placeholder="Room Name"
            type="text"
            register={register("name")}
            errors={errors}
          />
          <Input
            label="Room Number"
            name="roomNo"
            placeholder="Room No"
            type="number"
            register={register("roomNo", { valueAsNumber: true })}
            errors={errors}
          />
          <Input
            label="Floor Number"
            name="floorNo"
            placeholder="Floor No"
            type="number"
            register={register("floorNo", { valueAsNumber: true })}
            errors={errors}
          />
          <Input
            label="Capacity (Persons)"
            name="capacity"
            placeholder="Capacity"
            type="number"
            register={register("capacity", { valueAsNumber: true })}
            errors={errors}
          />
          <Input
            label="Price Per Slot ($)"
            name="pricePerSlot"
            placeholder="Price Per Slot"
            type="number"
            register={register("pricePerSlot", { valueAsNumber: true })}
            errors={errors}
          />
        </div>

        <div className="pt-4 border-t border-slate-100">
          <Button
            type="submit"
            text={updateRoomLoading ? "Updating Room..." : "Update Room"}
            disabled={updateRoomLoading}
            bgColor="bg-indigo-600 hover:bg-indigo-700"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateRoom;
