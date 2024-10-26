import { Divider } from "antd";
import { FaBed, FaClipboardList, FaDollarSign } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div>
      <Divider style={{ fontSize: "25px", fontWeight: "bold" }}>
        Welcome to Dashboard
      </Divider>
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">
          Dashboard Overview
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <div className="mr-4 p-5 bg-green-500 text-white rounded-full">
              <FaClipboardList className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">
                Total Bookings
              </h3>
              <p className="text-2xl font-bold text-gray-900">345</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <div className="mr-4 p-3 bg-blue-500 text-white rounded-full">
              <FaDollarSign className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">Money Spent</h3>
              <p className="text-2xl font-bold text-gray-900">$12,530</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <div className="mr-4 p-3 bg-purple-500 text-white rounded-full">
              <FaBed className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">
                Rooms Available
              </h3>
              <p className="text-2xl font-bold text-gray-900">28</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
