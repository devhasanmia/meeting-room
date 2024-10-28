import Input from "../../components/ui/Input";

const CreateSlots = () => {
  return (
    <div>
      <div className="bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <form >
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Room Name"
                name="name"
                placeholder="Room Name"
                type="text"
                // register={register("name")}
                // errors={errors}
              />
              <Input
                label="Room No"
                name="roomNo"
                placeholder="Room No"
                type="number"
                // register={register("roomNo", { valueAsNumber: true })}
                // errors={errors}
              />
              <Input
                label="Floor No"
                name="floorNo"
                placeholder="Floor No"
                type="number"
                // register={register("floorNo", { valueAsNumber: true })}
                // errors={errors}
              />
              <Input
                label="Capacity"
                name="capacity"
                placeholder="Capacity"
                type="number"
                // register={register("capacity", { valueAsNumber: true })}
                // errors={errors}
              />
              <Input
                label="Price Per Slot"
                name="pricePerSlot"
                placeholder="Price Per Slot"
                type="number"
                // register={register("pricePerSlot", { valueAsNumber: true })}
                // errors={errors}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSlots;
