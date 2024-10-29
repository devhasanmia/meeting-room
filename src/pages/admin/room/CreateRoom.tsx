import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { TRoomProps } from "../../../types/rooms.type";
import { roomCreateValidation } from "../../../schemas/validation";
import { useCreateRoomMutation } from "../../../redux/features/room/roomApi";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const CreateRoom = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<TRoomProps>({
    resolver: zodResolver(roomCreateValidation),
  });

  const [amenities, setAmenities] = useState<string[]>([]);
  const [amenityInput, setAmenityInput] = useState("");
  const [createRoom, { isLoading }] = useCreateRoomMutation();
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = async (data: TRoomProps) => {
    try {
      let formData = new FormData();
      formData.append("name", data.name);
      formData.append("roomNo", data.roomNo.toString());
      formData.append("floorNo", data.floorNo.toString());
      formData.append("capacity", data.capacity.toString());
      formData.append("pricePerSlot", data.pricePerSlot.toString());

      amenities.forEach((amenity) => {
        formData.append("amenities[]", amenity);
      });

      if (file) {
        formData.append("file", file);
      }

      await createRoom(formData).unwrap();
      console.log(formData)
      toast.success("Room Created Successfully");
      reset();
      setAmenities([]);
      setFile(null);
    } catch (error: any) {
      if (error.data && error.data.errorMessages) {
        error.data.errorMessages.forEach((err: { path: string; message: string }) => {
          setError(err.path as keyof TRoomProps, { type: "server", message: err.message });
        });
        toast.error("Validation Error. Please check your input.");
      } else {
        toast.error("Failed to create room.");
      }
    }
  };

  const handleAddAmenity = () => {
    if (amenityInput.trim() !== "") {
      setAmenities((prevAmenities) => [...prevAmenities, amenityInput.trim()]);
      setAmenityInput("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.startsWith("image/")) {
        setFile(selectedFile);
      } else {
        toast.error("Please upload a valid image file.");
      }
    }
  };

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
                disabled={!amenityInput.trim()}
                className={`px-4 p-3 text-white bg-green-500 border border-green-400 rounded-r-md shadow-sm focus:outline-none ${
                  !amenityInput.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600 transition"
                }`}
              >
                Add
              </button>
            </div>

            <div className="flex flex-col items-center justify-center w-full mt-4">
              <label
                htmlFor="image-upload"
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                Upload Image
              </label>
              <input
                id="image-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />

              {file && (
                <div className="mt-4 text-center">
                  <p className="text-gray-700">File Uploaded: {file.name}</p>
                  {file.type.startsWith("image/") && (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="mt-2 w-100 object-cover rounded-lg border"
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {amenities.length > 0 && (
            <div className="col-span-3 mt-4 mb-3">
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
                        setAmenities((prev) => prev.filter((_, i) => i !== index))
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

          <Button
            text={isLoading ? "Loading" : "Create Room"}
            type="submit"
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
