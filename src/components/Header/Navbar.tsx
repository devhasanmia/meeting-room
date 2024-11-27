import { Link, NavLink, useNavigate } from "react-router-dom";
import CustomLink from "../ui/CustomLink";
import { HiOutlineMenuAlt1, HiOutlineX } from "react-icons/hi";
import { useState } from "react";
import logo from "../../assets/images/logo.png";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { tokenVerify } from "../../utils/tokenVerify";
import { logout } from "../../redux/features/auth/authSlice";

const Navbar = () => {
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex justify-between items-center p-4 container mx-auto">
        {/* Logo */}
        <div>
          <Link to="/">
            <img src={logo} alt="Logo" width={"250px"} />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <CustomLink to="/">Home</CustomLink>
          <CustomLink to="/meeting-rooms">Meeting Rooms</CustomLink>
          <CustomLink to="/about-us">About Us</CustomLink>
          <CustomLink to="/contact-us">Contact Us</CustomLink>

          {user ? (
            <div className="flex space-x-4">
              {user?.role === "admin" ? (
                <Link to="/admin">
                  <button className="px-6 py-2 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300">
                    Dashboard
                  </button>
                </Link>
              ) : (
                <Link to="/user/my-booking">
                  <button className="px-6 py-2 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300">
                    My Bookings
                  </button>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="px-6 py-2 text-lg font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <NavLink to="/login">
                <button className="px-6 py-2 text-lg font-semibold border border-white text-[#1F5D79] hover:bg-[#00B6FF] hover:text-white rounded-full transition-all duration-300">
                  Login
                </button>
              </NavLink>
              <NavLink to="/signup">
                <button className="px-6 py-2 text-lg font-semibold bg-[#00B6FF] text-white hover:bg-[#00B6FF] hover:text-white rounded-full transition-all duration-300">
                  Signup
                </button>
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-[#00B6FF]">
            {isMenuOpen ? (
              <HiOutlineX size={24} />
            ) : (
              <HiOutlineMenuAlt1 size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg">
          <div className="flex flex-col space-y-4 p-6">
            <CustomLink
              to="/"
              onClick={toggleMenu}
              className="text-lg text-[#1F5D79] hover:text-[#00B6FF] transition duration-300"
            >
              Home
            </CustomLink>
            <CustomLink
              to="/meeting-rooms"
              onClick={toggleMenu}
              className="text-lg text-[#1F5D79] hover:text-[#00B6FF] transition duration-300"
            >
              Meeting Rooms
            </CustomLink>
            <CustomLink
              to="/about-us"
              onClick={toggleMenu}
              className="text-lg text-[#1F5D79] hover:text-[#00B6FF] transition duration-300"
            >
              About Us
            </CustomLink>
            <CustomLink
              to="/contact-us"
              onClick={toggleMenu}
              className="text-lg text-[#1F5D79] hover:text-[#00B6FF] transition duration-300"
            >
              Contact Us
            </CustomLink>

            {user ? (
              <div className="flex flex-col gap-2 justify-between md:flex-row w-full">
                {user?.role === "admin" ? (
                  <Link to="/admin">
                    <button className="w-full px-4 py-2 text-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg shadow hover:bg-emerald-600 transition-all duration-300">
                      Dashboard
                    </button>
                  </Link>
                ) : (
                  <Link to="/user/my-booking">
                    <button className="w-full px-4 py-2 text-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg shadow hover:bg-emerald-600 transition-all duration-300">
                      My Bookings
                    </button>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-lg bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow hover:bg-red-600 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 w-full">
                <NavLink to="/login">
                  <button className="w-full md:w-auto px-6 py-2 text-lg font-semibold border border-white text-[#1F5D79] hover:bg-[#00B6FF] hover:text-white rounded-full transition-all duration-300">
                    Login
                  </button>
                </NavLink>
                <NavLink to="/signup" className="w-full md:w-auto">
                  <button className="w-full md:w-auto px-6 py-2 text-lg font-semibold bg-[#00B6FF] text-white hover:bg-[#00B6FF] hover:text-white rounded-full transition-all duration-300">
                    Signup
                  </button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
