import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiBuildingHouse } from "react-icons/bi";

type TRoomProps = {
  _id: string;
  image: string;
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
};

const RoomItem = ({ _id, name, capacity, pricePerSlot, image, roomNo, floorNo }: TRoomProps) => {
  return (
    <div key={_id} className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 flex flex-col justify-between h-full">
      <div className="relative overflow-hidden h-52">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white">
          Floor {floorNo}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
              {name}
            </h3>
            <p className="text-slate-400 text-xs mt-1 font-semibold">Room No: {roomNo}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-y border-slate-100 py-3.5">
            <div className="flex items-center space-x-2 text-slate-600">
              <HiOutlineUserGroup className="text-lg text-indigo-500" />
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase leading-none">Capacity</p>
                <p className="text-sm font-bold text-slate-700 mt-0.5">{capacity} People</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-slate-600">
              <BiBuildingHouse className="text-lg text-emerald-500" />
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase leading-none">Price / Slot</p>
                <p className="text-sm font-bold text-slate-700 mt-0.5">${pricePerSlot}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Link to={`/user/meeting-rooms-details/${_id}`}>
            <Button text="See Details" bgColor="bg-indigo-600 hover:bg-indigo-700" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
