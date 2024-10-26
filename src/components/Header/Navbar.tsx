import { Link } from "react-router-dom";
import CustomLink from "../ui/CustomLink";
import { HiOutlineMenuAlt1, HiOutlineX } from "react-icons/hi"; // Import X icon for closing the menu
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu visibility

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Toggle the menu open/close state
  };

  return (
    <nav className="flex justify-between items-center p-5 bg-emerald-400 shadow-lg z-50">
      <div className="flex justify-between container mx-auto">
        <div className="flex items-center">
          <Link to={"/"}>
            <span className="text-3xl font-bold text-gray-800 cursor-pointer">
              <span className="text-white">Meeting</span>
              <span className="text-green-950"> Room</span>
            </span>
          </Link>
        </div>

        {/* Menu Section */}
        <div className="hidden md:flex space-x-8 items-center">
          <CustomLink to="/">Home</CustomLink>
          <CustomLink to="/meeting-rooms">Meeting Rooms</CustomLink>
          <CustomLink to="/about-us">About Us</CustomLink>
          <CustomLink to="/contact-us">Contact Us</CustomLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 text-white-900 hover:bg-pink-900 rounded-lg focus:outline-none"
          >
            {isMenuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt1 />}{" "}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute z-50 top-32 left-0 right-0 bg-cyan-950 bg-opacity-90 shadow-lg p-4 rounded-lg">
          <div className="flex flex-col space-y-2">
            <CustomLink
              to="/"
              onClick={toggleMenu}
              className="text-gray-800 hover:text-green-600"
            >
              Home
            </CustomLink>
            <CustomLink
              to="/meeting-rooms"
              onClick={toggleMenu}
              className="text-gray-800 hover:text-green-600"
            >
              Meeting Rooms
            </CustomLink>
            <CustomLink
              to="/about-us"
              onClick={toggleMenu}
              className="text-gray-800 hover:text-green-600"
            >
              About Us
            </CustomLink>
            <CustomLink
              to="/contact-us"
              onClick={toggleMenu}
              className="text-gray-800 hover:text-green-600"
            >
              Contact Us
            </CustomLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
