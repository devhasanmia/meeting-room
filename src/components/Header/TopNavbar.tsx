import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const TopHeader = () => {
  return (
    <div>
      <div className="hidden px-7 mx-auto container-fluid lg:px-24 md:block bg-gray-150 p-2">
        <div className="grid items-center grid-cols-12 justify-between">
          <div className="col-span-7">
            <ul className="flex items-center py-3">
              <li className="mr-4">
                <p className="mb-0 text-13">
                  <MdOutlineMarkEmailUnread className="inline" />{" "}
                  hasanmiaweb@gmail.com
                </p>
              </li>
            </ul>
          </div>

          <div className="col-span-5">
            <div className="flex justify-end">
              <Link to={"/login"}>
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-700 transition duration-200">
                  <FaSignInAlt /> Login
                </button>
              </Link>
              <Link to={"/signup"}>
                <button className="flex items-center gap-2 px-4 py-2 ml-4 text-white bg-[#16d6ba] rounded hover:bg-[#037463] transition duration-200">
                  <FaUserPlus /> Sign up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
