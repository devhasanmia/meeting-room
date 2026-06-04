import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { TRoomProps } from "../../../types/rooms.type";
import { roomCreateValidation } from "../../../schemas/validation";
import { useCreateRoomMutation } from "../../../redux/features/room/roomApi";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { FiPlus, FiUploadCloud, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";

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
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Create New Room</h2>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
            Add a new conference room or workspace space
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Room Name"
            name="name"
            placeholder="Executive Boardroom"
            type="text"
            register={register("name")}
            errors={errors}
          />
          <Input
            label="Room Number"
            name="roomNo"
            placeholder="301"
            type="number"
            register={register("roomNo", { valueAsNumber: true })}
            errors={errors}
          />
          <Input
            label="Floor Number"
            name="floorNo"
            placeholder="3"
            type="number"
            register={register("floorNo", { valueAsNumber: true })}
            errors={errors}
          />
          <Input
            label="Capacity (Persons)"
            name="capacity"
            placeholder="12"
            type="number"
            register={register("capacity", { valueAsNumber: true })}
            errors={errors}
          />
          <Input
            label="Price Per Slot ($)"
            name="pricePerSlot"
            placeholder="50"
            type="number"
            register={register("pricePerSlot", { valueAsNumber: true })}
            errors={errors}
          />

          {/* Add Amenity Form Field */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Add Amenities
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                placeholder="High-speed Wi-Fi"
                className="w-full px-4 py-3 rounded-l-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 text-slate-800 placeholder-slate-400 bg-white transition duration-200"
              />
              <button
                type="button"
                onClick={handleAddAmenity}
                disabled={!amenityInput.trim()}
                className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-400 text-white rounded-r-lg border border-indigo-600 disabled:border-slate-200 transition duration-200 flex items-center justify-center shrink-0"
              >
                <FiPlus size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Amenities Tags List */}
        {amenities.length > 0 && (
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Amenities List</h4>
            <div className="flex flex-wrap gap-2">
              {amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 text-xs px-3 py-1.5 rounded-lg font-semibold shadow-sm"
                >
                  <span>{amenity}</span>
                  <button
                    type="button"
                    onClick={() => setAmenities((prev) => prev.filter((_, i) => i !== index))}
                    className="text-slate-400 hover:text-rose-600 transition"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Upload File Input Field */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Room Showcase Image
          </label>
          <div className="flex flex-col items-center justify-center w-full border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-6 bg-slate-50/50 hover:bg-white transition cursor-pointer relative group">
            <input
              id="image-upload"
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            <div className="text-center space-y-2 pointer-events-none">
              <div className="flex justify-center text-slate-400 group-hover:text-indigo-500 transition">
                <FiUploadCloud size={32} />
              </div>
              <p className="text-xs font-bold text-slate-600">
                Click or drag image file here to upload
              </p>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                PNG, JPG, JPEG up to 5MB
              </p>
            </div>
          </div>

          {/* Uploaded File Preview details */}
          {file && (
            <div className="mt-4 p-4 border border-slate-200 rounded-2xl flex items-center justify-between gap-4 bg-white">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-100 shrink-0">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 line-clamp-1">{file.name}</p>
                  <p className="text-xs text-slate-400 font-semibold">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="p-2 rounded-lg bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-600 hover:text-white transition"
              >
                <FiTrash size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-100">
          <Button
            text={isLoading ? "Creating Room..." : "Create Room"}
            type="submit"
            disabled={isLoading}
            bgColor="bg-indigo-600 hover:bg-indigo-700"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateRoom;
