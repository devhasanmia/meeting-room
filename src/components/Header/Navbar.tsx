import { Link, NavLink } from "react-router-dom";
import CustomLink from "../ui/CustomLink";
import { HiOutlineMenuAlt1, HiOutlineX } from "react-icons/hi";
import { useState } from "react";
import logo from "../../assets/images/logo.png";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    console.log("Logged out");
    setIsLoggedIn(false); // Simulate logout
    setIsMenuOpen(false); // Close menu after clicking
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex justify-between items-center p-4 container mx-auto">
        {/* Logo */}
        <div>
          <Link to="/">
            <img src={logo} alt="" width={"250px"} />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <CustomLink
            to="/"
          >
            Home
          </CustomLink>
          <CustomLink
            to="/meeting-rooms"
          >
            Meeting Rooms
          </CustomLink>
          <CustomLink
            to="/about-us"
          >
            About Us
          </CustomLink>
          <CustomLink
            to="/contact-us"
          >
            Contact Us
          </CustomLink>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-6 py-2 text-lg font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <div className="flex space-x-4">
              <NavLink to={"/login"}>
                <button className="px-6 py-2 text-lg font-semibold border border-whtie text-[#1F5D79] hover:bg-[#00B6FF] hover:text-white rounded-full transition-all duration-300">
                  Login
                </button>
              </NavLink>
              <NavLink to={"/signup"}>
                <button
                  className="px-6 py-2 text-lg font-semibold bg-[#00B6FF] text-white hover:bg-[#00B6FF] hover:text-white rounded-full transition-all duration-300"
                >
                  Signup
                </button>
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-[#00B6FF]"
            // className="p-2 text-white bg-yellow-400 hover:bg-yellow-500 rounded-lg focus:outline-none transition duration-300"
          >
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
            <div className="flex flex-col gap-2 justify-between md:flex-row w-full">
              {isLoggedIn ? (
                <button
                  className="w-full px-4 py-2 text-lg bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-all duration-300"
                >
                  Logout
                </button>
              ) : (
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 w-full">
                  <Link to={"/login"}>
                    <button className="w-full md:w-auto px-6 py-2 text-lg font-semibold border border-white text-[#1F5D79] hover:bg-[#00B6FF] hover:text-white rounded-full transition-all duration-300">
                      Login
                    </button>
                  </Link>
                  <Link to={"/signup"} className="w-full md:w-auto">
                    <button className="w-full md:w-auto px-6 py-2 text-lg font-semibold bg-[#00B6FF] text-white hover:bg-[#00B6FF] hover:text-white rounded-full transition-all duration-300">
                      Signup
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
