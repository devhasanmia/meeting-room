import { Link, NavLink, useNavigate } from "react-router-dom";
import CustomLink from "../ui/CustomLink";
import { HiOutlineMenuAlt1, HiOutlineX } from "react-icons/hi";
import { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { tokenVerify } from "../../utils/tokenVerify";
import { logout } from "../../redux/features/auth/authSlice";

const Navbar = () => {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  let user;
  if (token) {
    user = tokenVerify(token);
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg border-b border-slate-200/50 py-3"
          : "bg-white py-4"
      }`}
    >
      <div className="flex justify-between items-center px-6 container mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 md:h-12 w-auto object-contain" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <div className="flex space-x-6">
            <CustomLink to="/">Home</CustomLink>
            <CustomLink to="/meeting-rooms">Meeting Rooms</CustomLink>
            <CustomLink to="/about-us">About Us</CustomLink>
            <CustomLink to="/contact-us">Contact Us</CustomLink>
          </div>

          <div className="h-5 w-[1px] bg-slate-200"></div>

          {user ? (
            <div className="flex space-x-3 items-center">
              {user?.role === "admin" ? (
                <Link to="/admin">
                  <button className="px-5 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-lg shadow-sm hover:shadow-md hover:bg-indigo-700 transition-all duration-300">
                    Admin Panel
                  </button>
                </Link>
              ) : (
                <Link to="/user/my-booking">
                  <button className="px-5 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-lg shadow-sm hover:shadow-md hover:bg-indigo-700 transition-all duration-300">
                    My Bookings
                  </button>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="px-5 py-2 text-sm font-semibold bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-lg border border-slate-200 hover:border-red-200 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-3 items-center">
              <NavLink to="/login">
                <button className="px-5 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg border border-slate-200 transition-all duration-300">
                  Login
                </button>
              </NavLink>
              <NavLink to="/signup">
                <button className="px-5 py-2 text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow transition-all duration-300">
                  Sign Up
                </button>
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition duration-300"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <HiOutlineX size={20} /> : <HiOutlineMenuAlt1 size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl animate-fade-in">
          <div className="flex flex-col space-y-4 p-6 bg-slate-50/50">
            <div className="flex flex-col space-y-3">
              <CustomLink to="/" onClick={toggleMenu} className="py-2 text-base text-slate-800">
                Home
              </CustomLink>
              <CustomLink to="/meeting-rooms" onClick={toggleMenu} className="py-2 text-base text-slate-800">
                Meeting Rooms
              </CustomLink>
              <CustomLink to="/about-us" onClick={toggleMenu} className="py-2 text-base text-slate-800">
                About Us
              </CustomLink>
              <CustomLink to="/contact-us" onClick={toggleMenu} className="py-2 text-base text-slate-800">
                Contact Us
              </CustomLink>
            </div>

            <div className="h-[1px] bg-slate-200 w-full"></div>

            {user ? (
              <div className="flex flex-col gap-3 w-full">
                {user?.role === "admin" ? (
                  <Link to="/admin" onClick={toggleMenu} className="w-full">
                    <button className="w-full py-2.5 text-sm font-semibold bg-indigo-600 text-white rounded-lg shadow-sm">
                      Admin Panel
                    </button>
                  </Link>
                ) : (
                  <Link to="/user/my-booking" onClick={toggleMenu} className="w-full">
                    <button className="w-full py-2.5 text-sm font-semibold bg-indigo-600 text-white rounded-lg shadow-sm">
                      My Bookings
                    </button>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 text-sm font-semibold bg-white border border-slate-200 text-red-600 rounded-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 w-full">
                <NavLink to="/login" onClick={toggleMenu} className="w-full">
                  <button className="w-full py-2.5 text-sm font-semibold border border-slate-200 text-slate-700 bg-white rounded-lg">
                    Login
                  </button>
                </NavLink>
                <NavLink to="/signup" onClick={toggleMenu} className="w-full">
                  <button className="w-full py-2.5 text-sm font-semibold bg-indigo-600 text-white rounded-lg shadow-sm">
                    Sign Up
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
