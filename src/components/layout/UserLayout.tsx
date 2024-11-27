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

      <div className="flex flex-col md:flex-row  min-h-screen mt-20">
        <div className="w-full md:w-1/5 p-6 text-white shadow-lg">
          <div className="space-y-6">
            <div className="space-y-4">
              <Link to="/user/my-booking">
                <Button text="My Bookings" type="button" />
              </Link>
              <Button
                text="Logout"
                onClick={() => {
                  dispatch(logout());
                  navigate("/", { replace: true });
                }}
                bgColor="bg-pink-600"
                bgHover="hover:bg-pink-700"
              />
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="w-full md:w-4/5 p-6 bg-white">
          <div className="container mx-auto space-y-8">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </>
  );
};

export default UserLayout;
