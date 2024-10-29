import { useGetAllUserQuery } from "../../redux/features/auth/authApi";
import { FaRegUser } from "react-icons/fa";
import { MdBookmarkAdded } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { useGetAllbookingsQuery } from "../../redux/features/booking/bookingApi";
const Dashboard = () => {
  const { data } = useGetAllbookingsQuery(undefined);
  const { data: getAllUser } = useGetAllUserQuery(undefined);

  const totalBalance = data?.data?.reduce((acc: any, curr: any) => {
    if (curr.payment && curr.payment === "Paid") {
      return acc + curr.totalAmount;
    }
    return acc;
  }, 0);

  return (
    <div className="p-4 sm:p-8 min-h-screen bg-gray-50">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-700 mb-4 sm:mb-6">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-8">
        <div className="p-4 sm:p-6 bg-white shadow-lg rounded-xl border border-indigo-100">
          <h3 className="text-base sm:text-lg font-semibold text-gray-600">
            Total Balance
          </h3>
          <p className="mt-2 sm:mt-4 text-3xl sm:text-4xl font-bold text-indigo-600 flex gap-2">
            <FaSackDollar /> {totalBalance}
          </p>
        </div>
        <div className="p-4 sm:p-6 bg-white shadow-lg rounded-xl border border-indigo-100">
          <h3 className="text-base sm:text-lg font-semibold text-gray-600">
            Total Booking
          </h3>
          <p className="mt-2 sm:mt-4 text-3xl sm:text-4xl font-bold text-indigo-600 flex gap-2">
            <MdBookmarkAdded /> {data?.data?.length}
          </p>
        </div>

        {/* Card 3: Total Users */}
        <div className="p-4 sm:p-6 bg-white shadow-lg rounded-xl border border-green-100">
          <h3 className="text-base sm:text-lg font-semibold text-gray-600">
            Total Users
          </h3>
          <p className="mt-2 sm:mt-4 text-3xl sm:text-4xl font-bold text-green-500 flex gap-2">
            <FaRegUser /> {getAllUser?.data?.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
