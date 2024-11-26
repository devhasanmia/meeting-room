import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { tokenVerify } from "../../utils/tokenVerify";

const TopHeader = () => {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let user;
  if (token) {
    user = tokenVerify(token);
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="bg-gray-100 shadow-md">
      <div className="bg-white px-5 py-3 container mx-auto lg:px-20 md:px-10">
        <div className="flex items-center justify-between">
          {/* Email Section */}
          <div className="hidden md:block">
            <p className="flex items-center text-sm text-gray-600">
              <MdOutlineMarkEmailUnread className="text-lg text-emerald-500 mr-2" />
              <span className="font-medium">hasanmiaweb@gmail.com</span>
            </p>
          </div>

          {/* User Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            {user ? (
              <div className="flex items-center gap-6">
                <h1 className="hidden md:block text-lg text-gray-800 font-semibold">
                  Hi, {user?.name}!
                </h1>
                <div className="flex gap-4">
                  {user?.role === "admin" ? (
                    <Link to="/admin">
                      <button className="px-4 py-2 bg-emerald-500 text-white rounded shadow hover:bg-emerald-600 hover:shadow-lg transition-all duration-300">
                        Dashboard
                      </button>
                    </Link>
                  ) : (
                    <Link to="/user/my-booking">
                      <button className="px-4 py-2 bg-emerald-500 text-white rounded shadow hover:bg-emerald-600 hover:shadow-lg transition-all duration-300">
                        My Bookings
                      </button>
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 hover:shadow-lg transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link to="/login">
                  <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded shadow hover:bg-emerald-600 hover:shadow-lg transition-all duration-300">
                    <FaSignInAlt /> Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded shadow hover:bg-teal-600 hover:shadow-lg transition-all duration-300">
                    <FaUserPlus /> Sign up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
