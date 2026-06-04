import { Spin, Table } from "antd";
import { TbError404 } from "react-icons/tb";
import { useMyBookingsQuery } from "../../redux/features/booking/bookingApi";
import { LoadingOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (date: string) => (
      <span className="font-semibold text-slate-600">{date}</span>
    ),
  },
  {
    title: "Room Name",
    dataIndex: "room",
    key: "room",
    render: (roomName: string) => (
      <span className="font-bold text-slate-800">{roomName}</span>
    ),
  },
  {
    title: "Booking Status",
    dataIndex: "isConfirmed",
    key: "isConfirmed",
    render: (status: string) => {
      const isConfirmed = status === "confirmed";
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
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
  {
    title: "Total Amount",
    dataIndex: "totalAmount",
    key: "totalAmount",
    render: (amount: any) => (
      <span className="font-bold text-indigo-600">${amount}</span>
    ),
  },
  {
    title: "Payment Status",
    dataIndex: "payment",
    key: "payment",
    render: (payment: string) => {
      const isPaid = payment === "Paid";
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
            isPaid
              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
              : "bg-rose-50 text-rose-700 border border-rose-100"
          }`}
        >
          {payment || "Unpaid"}
        </span>
      );
    },
  },
  {
    title: "Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
    render: (text: any) => (
      <span className="font-mono text-xs text-slate-500">{text ? text : "N/A"}</span>
    ),
  },
];

const MyBooking = () => {
  const { data: myBooking, isLoading } = useMyBookingsQuery(undefined);
  const antIcon = <LoadingOutlined style={{ fontSize: 32, color: '#4f46e5' }} spin />;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-60">
        <Spin indicator={antIcon} />
      </div>
    );
  }

  if (!myBooking || !myBooking.data.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mb-4 border border-slate-100 shadow-inner">
          <TbError404 size={48} />
        </div>
        <h3 className="text-lg font-bold text-slate-800">No Bookings Found</h3>
        <p className="text-sm text-slate-400 max-w-xs mt-1">
          You don’t have any booking records yet. Start booking rooms to see them here!
        </p>
      </div>
    );
  }

  const dataSource = myBooking.data?.map((booking: any) => ({
    key: booking._id,
    date: booking.date || "No Date",
    isConfirmed: booking.isConfirmed || "unconfirmed",
    room: booking?.room?.name || "No Room",
    totalAmount: booking.totalAmount || "0",
    payment: booking.payment || "Unpaid",
    transactionId: booking.transactionId || "",
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">My Bookings</h2>
        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
          History of all your reservations
        </p>
      </div>

      <div className="overflow-hidden border border-slate-100 rounded-xl shadow-sm">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 5 }}
          className="custom-table"
          scroll={{ x: true }}
        />
      </div>
    </div>
  );
};

export default MyBooking;
