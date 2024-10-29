import FeaturedRooms from "../components/Sections/FeaturedRooms";
import { Divider } from "antd";

const MeetingRooms = () => {
  return (
    <div className="flex bg-white p-6 space-y-6 md:space-y-0 md:space-x-6">
      <div className="w-full">
        <Divider style={{ fontSize: "25px", fontWeight: "bold" }}>
          Total Meeting Rooms
        </Divider>
        <FeaturedRooms />
      </div>
    </div>
  );
};

export default MeetingRooms;
