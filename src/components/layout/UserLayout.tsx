import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Header/Navbar";
import Footer from "../../pages/Footer/Footer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { HiOutlineBookmark, HiOutlineLogout } from "react-icons/hi";

const UserLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <Navbar />

      <div className="bg-slate-50 min-h-screen pt-28 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Sidebar Section */}
          <div className="w-full md:w-1/4 shrink-0">
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm space-y-6">
              {/* User Avatar Details */}
              <div className="text-center space-y-3 pb-6 border-b border-slate-100">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto border-2 border-indigo-100 shadow-inner">
                  {user?.name ? user.name[0].toUpperCase() : "U"}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800 line-clamp-1">{user?.name || "User"}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Member Account</p>
                </div>
              </div>

              {/* Navigation Options */}
              <div className="space-y-2">
                <Link
                  to="/user/my-booking"
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition duration-200 ${
                    isActive("/user/my-booking")
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  <HiOutlineBookmark size={18} />
                  <span>My Bookings</span>
                </Link>

                <button
                  onClick={() => {
                    dispatch(logout());
                    navigate("/", { replace: true });
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600 transition duration-200"
                >
                  <HiOutlineLogout size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="w-full md:w-3/4">
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 md:p-8 shadow-sm min-h-[450px]">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserLayout;
