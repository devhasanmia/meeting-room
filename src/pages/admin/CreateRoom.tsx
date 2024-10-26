import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import CustomInput from "../../components/ui/Input";
import CustomButton from "../../components/ui/Button";
import { roomCreateValidation } from "../../schemas/validation";
import { TRoomProps } from "../../types/rooms.type";
import { useCreateRoomMutation } from "../../redux/features/room/roomApi";
import { toast } from "sonner";

const CreateRoom = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TRoomProps>({
    resolver: zodResolver(roomCreateValidation),
  });

  const [amenities, setAmenities] = useState<string[]>([]);
  const [amenityInput, setAmenityInput] = useState("");
  const [createRoom] = useCreateRoomMutation();

  const onSubmit = async (data: TRoomProps) => {
    const formattedData = {
      ...data,
      amenities: amenities,
    };
    await createRoom(formattedData);
    setAmenities([])
    toast.success("Room Create Successful"), reset();
  };

  const handleAddAmenity = () => {
    if (amenityInput.trim() !== "") {
      setAmenities((prevAmenities) => [...prevAmenities, amenityInput.trim()]);
      setAmenityInput("");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CustomInput
              label="Room Name"
              name="name"
              placeholder="Room Name"
              type="text"
              register={register("name")}
              errors={errors}
            />
            <CustomInput
              label="Room No"
              name="roomNo"
              placeholder="Room No"
              type="number"
              register={register("roomNo", { valueAsNumber: true })}
              errors={errors}
            />
            <CustomInput
              label="Floor No"
              name="floorNo"
              placeholder="Floor No"
              type="number"
              register={register("floorNo", { valueAsNumber: true })}
              errors={errors}
            />
            <CustomInput
              label="Capacity"
              name="capacity"
              placeholder="Capacity"
              type="number"
              register={register("capacity", { valueAsNumber: true })}
              errors={errors}
            />
            <CustomInput
              label="Price Per Slot"
              name="pricePerSlot"
              placeholder="Price Per Slot"
              type="number"
              register={register("pricePerSlot", { valueAsNumber: true })}
              errors={errors}
            />

            {/* Amenities Input */}
            <div className="flex items-center space-x-2 mt-1">
              <input
                type="text"
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                placeholder="Add Amenity"
                className="block w-full p-3 border border-green-400 rounded-l-md shadow-sm focus:outline-none focus:ring-green-500"
              />
              <button
                type="button"
                onClick={handleAddAmenity}
                className="px-4 p-3 text-white bg-green-500 border border-green-400 rounded-r-md shadow-sm focus:outline-none hover:bg-green-600 transition"
              >
                Add
              </button>
            </div>
          </div>
           {/* Display Added Amenities */}
           {amenities.length > 0 && (
              <div className="col-span-3 mt-4">
                <h4 className="font-semibold mb-2">Amenities:</h4>
                <ul className="space-y-2">
                  {amenities.map((amenity, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-gray-100 p-2 rounded-md shadow-sm"
                    >
                      <span className="text-gray-700">{amenity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setAmenities((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                        className="text-red-500 hover:text-red-700 transition-colors focus:outline-none"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          <CustomButton text="Create New Room" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
