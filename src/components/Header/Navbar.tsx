import { Link } from "react-router-dom";
import CustomLink from "../ui/CustomLink";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-5 bg-emerald-400 shadow-lg z-50">
      <div className=" flex justify-between container mx-auto">
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
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg focus:outline-none">
            <HiOutlineMenuAlt1 />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
