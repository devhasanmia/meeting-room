import { Spin } from "antd";
import { useGetRoomsQuery } from "../../redux/features/room/roomApi";
import { TRoomProps } from "../../types/rooms.type";
import RoomItem from "./RoomItem";

const FeaturedRooms = () => {
  const { data: rooms, isLoading } = useGetRoomsQuery(undefined);
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      
      {isLoading ? (
        <div className="flex justify-center items-center h-60">
          <Spin />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {rooms?.data?.map((room: TRoomProps) => (
            <RoomItem {...room} key={room._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedRooms;
