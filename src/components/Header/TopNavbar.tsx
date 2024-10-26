import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";

const TopHeader = () => {
  type TUser = {
    name: string;
    email: string;
  };
  const user = useAppSelector((state): TUser | null => state.auth?.user);
  const dispatch = useAppDispatch();
  return (
    <div className="bg-gray-150">
      <div className="bg-white px-7 mx-auto container-fluid lg:px-24 md:px-12 p-2">
        <div className="flex items-center justify-between">
          <div className="hidden md:block">
            <ul className="flex items-center py-3">
              <li className="mr-4">
                <p className="text-sm text-gray-600">
                  <MdOutlineMarkEmailUnread className="inline-block mr-2" />
                  hasanmiaweb@gmail.com
                </p>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 sm:justify-center lg:justify-end lg:w-auto">
            {user ? (
              <div className="flex items-center gap-4 lg:gap-5">
                <h1 className="hidden md:block text-gray-800">
                  Hi! {user?.name}
                </h1>
                <div className="flex gap-4">
                  <Link to={"/user/dashboard"}>
                    <button className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition duration-200">
                      Dashboard
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      dispatch(logout());
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 sm:gap-5">
                <Link to="/login">
                  <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-700 transition duration-200">
                    <FaSignInAlt /> Login
                  </button>
                </Link>

                <Link to="/signup">
                  <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition duration-200">
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
