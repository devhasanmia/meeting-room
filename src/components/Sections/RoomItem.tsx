import Button from "../ui/Button";

type TRoomProps = {
  _id: string;
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
};

const RoomItem = ({ _id, name, capacity, pricePerSlot }: TRoomProps) => {
  return (
    <div key={_id} className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src="https://checkout.puffy.ca/cdn/shop/articles/aesthetic-room-decor-ideas-3_1600x.jpg"
        alt={name}
        className="w-full h-60 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600">Capacity: {capacity}</p>
        <p className="text-gray-600">Price per slot: ${pricePerSlot}</p>
        <Button
          text="See Details"
          bgColor="bg-emerald-500"
          onClick={() => {
            console.log(_id);
          }}
        />
      </div>
    </div>
  );
};

export default RoomItem;
