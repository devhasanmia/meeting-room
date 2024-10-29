import { useParams } from "react-router-dom";

import { useForm } from "react-hook-form";

import { useEffect } from "react";
import { toast } from "sonner";
import {
  useGetRoomByIdAndUpdateMutation,
  useGetRoomsByIdQuery,
} from "../../../redux/features/room/roomApi";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

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
      await updateRoom({ id, data: formData });
      toast.success("Room updated successfully!");
      reset();
      window.history.back();
    } catch (error) {
      toast.error("Failed to update room");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching room data</p>;

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Room Name"
              name="name"
              placeholder="Room Name"
              type="text"
              register={register("name")}
              errors={errors}
            />
            <Input
              label="Room No"
              name="roomNo"
              placeholder="Room No"
              type="number"
              register={register("roomNo", { valueAsNumber: true })}
              errors={errors}
            />
            <Input
              label="Floor No"
              name="floorNo"
              placeholder="Floor No"
              type="number"
              register={register("floorNo", { valueAsNumber: true })}
              errors={errors}
            />
            <Input
              label="Capacity"
              name="capacity"
              placeholder="Capacity"
              type="number"
              register={register("capacity", { valueAsNumber: true })}
              errors={errors}
            />
            <Input
              label="Price Per Slot"
              name="pricePerSlot"
              placeholder="Price Per Slot"
              type="number"
              register={register("pricePerSlot", { valueAsNumber: true })}
              errors={errors}
            />
          </div>
          <Button
            type="submit"
            text={updateRoomLoading ? "Lodding" : "Update"}
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateRoom;
