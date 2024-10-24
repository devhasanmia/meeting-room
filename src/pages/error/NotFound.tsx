import { Link } from "react-router-dom";
import notFound from "../../assets/images/notFound.svg";
const NotFound = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div>
        <img src={notFound} alt="Not Found" width={"500px"} />
        <button className="p-3 bg-[#16d6ba] text-white text-1xl font-semibold rounded-md">
          <Link to={"/"}>Back to home</Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
