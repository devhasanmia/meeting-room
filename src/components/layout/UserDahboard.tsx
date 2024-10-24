import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Header/Navbar";
import Footer from "../../pages/Footer/Footer";
import { Divider } from "antd";
import Button from "../ui/Button";
import { FaBed, FaClipboardList, FaDollarSign } from "react-icons/fa";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";

const UserDahboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  return (
    <>
      <Navbar />
      <Outlet />
      <div className="flex flex-col md:flex-row bg-white p-6 space-y-6 md:space-y-0 md:space-x-6 min-h-screen">
        <div className="w-full md:w-1/4  p-6 rounded-lg shadow-sm">
          <div className="mt-3">
            <Button text="My Bookings" />
            <Button
              text="Logout"
              onClick={() => {
                dispatch(logout());
                navigate('/', { replace: true });
              }}
              bgColor="bg-pink-500"
              bgHover="hover:bg-pink-500"
            />
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <Divider style={{ fontSize: "25px", fontWeight: "bold" }}>
            Welcome to Dashboard
          </Divider>
          <div className="container mx-auto p-5">
            <h2 className="text-2xl font-semibold text-gray-800 mb-5">
              Dashboard Overview
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
                <div className="mr-4 p-3 bg-green-500 text-white rounded-full">
                  <FaClipboardList className="w-6 h-6" />
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
                  <FaDollarSign className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700">
                    Money Spent
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">$12,530</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
                <div className="mr-4 p-3 bg-purple-500 text-white rounded-full">
                  <FaBed className="w-6 h-6" />
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
      </div>
      <Footer />
    </>
  );
};

export default UserDahboard;
