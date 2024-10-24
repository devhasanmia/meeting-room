import FeaturedRooms from "../components/Sections/FeaturedRooms";
import { Divider } from "antd";

const MeetingRooms = () => {
  return (
    <div className="flex flex-col md:flex-row bg-white p-6 space-y-6 md:space-y-0 md:space-x-6">
      <div className="w-full md:w-1/4  p-6 rounded-lg shadow-sm">
        <div className="mb-6">
          <Divider style={{ fontSize: "25px" }}>Search Rooms</Divider>
          <input
            type="text"
            placeholder="Search by room name or keyword"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <hr className="my-4" />
        <div className="mb-6">
          <Divider style={{ fontSize: "25px" }}>Filter by Capacity</Divider>
          <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="ALL">ALL</option>
            <option value="1-5">1-5</option>
            <option value="6-10">6-10</option>
            <option value="11-20">11-20</option>
          </select>
        </div>

        <div className="mb-6">
          <Divider style={{ fontSize: "25px" }}>Filter by Price</Divider>
          <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="All">All</option>
            <option value="0-100">$0 - $100</option>
            <option value="101-200">$101 - $200</option>
            <option value="201-300">$201 - $300</option>
          </select>
        </div>
      </div>
      <div className="w-full md:w-3/4">
        <Divider style={{ fontSize: "25px", fontWeight: "bold" }}>
          Rooms
        </Divider>
        <FeaturedRooms />
      </div>
    </div>
  );
};

export default MeetingRooms;
