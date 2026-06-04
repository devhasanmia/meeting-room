import { useGetAllUserQuery } from "../../redux/features/auth/authApi";
import { FaRegUser } from "react-icons/fa";
import { MdBookmarkAdded } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { useGetAllbookingsQuery } from "../../redux/features/booking/bookingApi";
import { Link } from "react-router-dom";
import { Table, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const { data: bookingsData, isLoading: bookingsLoading } = useGetAllbookingsQuery(undefined);
  const { data: getAllUser, isLoading: usersLoading } = useGetAllUserQuery(undefined);
  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#4f46e5' }} spin />;

  const totalBalance = bookingsData?.data?.reduce((acc: any, curr: any) => {
    if (curr.payment && curr.payment === "Paid") {
      return acc + curr.totalAmount;
    }
    return acc;
  }, 0) || 0;

  // Recent Bookings Table Columns
  const columns = [
    {
      title: "Room Name",
      dataIndex: "roomName",
      key: "roomName",
      render: (text: string) => <span className="font-bold text-slate-800">{text}</span>,
    },
    {
      title: "User",
      dataIndex: "userName",
      key: "userName",
      render: (text: string) => <span className="font-medium text-slate-600">{text}</span>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text: string) => <span className="text-slate-500 font-semibold">{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const isConfirmed = status === "confirmed";
        return (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              isConfirmed
                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                : "bg-amber-50 text-amber-700 border border-amber-100"
            }`}
          >
            {status || "pending"}
          </span>
        );
      },
    },
  ];

  const recentDataSource = bookingsData?.data?.slice(0, 5).map((booking: any) => ({
    key: booking._id,
    roomName: booking.room?.name || "N/A",
    userName: booking.user?.name || "N/A",
    date: booking.date || "N/A",
    status: booking.isConfirmed || "unconfirmed",
  }));

  const isLoading = bookingsLoading || usersLoading;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-80">
        <Spin indicator={antIcon} />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">Dashboard Overview</h2>
        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
          Overview of platform growth and activity
        </p>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Revenue */}
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="absolute right-4 bottom-4 text-indigo-400 opacity-20 text-7xl font-bold">
            $
          </div>
          <div className="space-y-4 relative z-10">
            <div className="flex items-center space-x-2.5">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10">
                <FaSackDollar size={18} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-100">Total Revenue</span>
            </div>
            <div>
              <p className="text-3xl font-black">${totalBalance.toFixed(2)}</p>
              <p className="text-[10px] text-indigo-200 mt-1 font-semibold uppercase tracking-wider">Accumulated earnings</p>
            </div>
          </div>
        </div>

        {/* Card 2: Total Bookings */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="absolute right-4 bottom-4 text-emerald-400 opacity-20 text-7xl font-bold">
            #
          </div>
          <div className="space-y-4 relative z-10">
            <div className="flex items-center space-x-2.5">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10">
                <MdBookmarkAdded size={18} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">Total Bookings</span>
            </div>
            <div>
              <p className="text-3xl font-black">{bookingsData?.data?.length || 0}</p>
              <p className="text-[10px] text-emerald-200 mt-1 font-semibold uppercase tracking-wider">Processed slots</p>
            </div>
          </div>
        </div>

        {/* Card 3: Total Users */}
        <div className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="absolute right-4 bottom-4 text-violet-400 opacity-20 text-7xl font-bold">
            U
          </div>
          <div className="space-y-4 relative z-10">
            <div className="flex items-center space-x-2.5">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10">
                <FaRegUser size={18} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-violet-100">Total Users</span>
            </div>
            <div>
              <p className="text-3xl font-black">{getAllUser?.data?.length || 0}</p>
              <p className="text-[10px] text-violet-200 mt-1 font-semibold uppercase tracking-wider">Registered accounts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Recent Bookings & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-800">Recent Bookings</h3>
            <Link to="/admin/booking-list" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline">
              View All
            </Link>
          </div>
          <div className="overflow-hidden border border-slate-100 rounded-xl shadow-sm bg-white">
            <Table
              columns={columns}
              dataSource={recentDataSource}
              pagination={false}
              scroll={{ x: true }}
            />
          </div>
        </div>

        {/* Quick Actions Shortcuts */}
        <div className="space-y-4 col-span-1">
          <h3 className="text-base font-bold text-slate-800">Quick Actions</h3>
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-3">
            <Link
              to="/admin/create-room"
              className="block w-full text-center py-3 text-xs font-bold text-indigo-600 bg-white hover:bg-indigo-50 border border-slate-200 rounded-xl transition duration-200 shadow-sm"
            >
              Create New Room
            </Link>
            <Link
              to="/admin/create-slots"
              className="block w-full text-center py-3 text-xs font-bold text-indigo-600 bg-white hover:bg-indigo-50 border border-slate-200 rounded-xl transition duration-200 shadow-sm"
            >
              Create Time Slots
            </Link>
            <Link
              to="/admin/user-list"
              className="block w-full text-center py-3 text-xs font-bold text-indigo-600 bg-white hover:bg-indigo-50 border border-slate-200 rounded-xl transition duration-200 shadow-sm"
            >
              Manage Users List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
