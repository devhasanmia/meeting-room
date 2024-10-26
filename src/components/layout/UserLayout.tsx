import { Link, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Header/Navbar";
import Footer from "../../pages/Footer/Footer";
import Button from "../ui/Button";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";

const UserLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row bg-white  md:space-y-0 md:space-x-6 min-h-screen">
        <div className="w-full md:w-1/6  p-6 shadow-sm bg-cyan-50">
          <div className="mt-3">
            <Link to={"/user/dashboard"}>
              <Button text="Dashboard" type="button" bgColor="bg-green-400" />
            </Link>
            <Link to={"/user/"}>
              <Button
                text="Available Slot"
                type="button"
                bgColor="bg-gray-900"
              />
            </Link>
            <Link to={"/user/my-booking"}>
              <Button text="My Bookings" type="button" />
            </Link>
            <Button
              text="Logout"
              onClick={() => {
                dispatch(logout());
                navigate("/", { replace: true });
              }}
              bgColor="bg-pink-500"
              bgHover="hover:bg-pink-500"
            />
          </div>
        </div>
        <div className="w-full md:w-3/3">
          <div className="container mx-auto p-5">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserLayout;
