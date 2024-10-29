import { Divider, Spin, Table } from "antd";
import { TbError404 } from "react-icons/tb";
import { useMyBookingsQuery } from "../../redux/features/booking/bookingApi";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Status",
    dataIndex: "isConfirmed",
    key: "isConfirmed",
    render: (text: string) => text,
  },
  {
    title: "Room",
    dataIndex: "room",
    key: "room",
  },
  {
    title: "Total Amount",
    dataIndex: "totalAmount",
    key: "totalAmount",
  },
  {
    title: "Payment Status",
    dataIndex: "payment",
    key: "payment",
  },
  {
    title: "Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
    render: (text: any) => (text ? text : "N/A"),
  },
];

const MyBooking = () => {
  const {
    data: myBooking,
    isLoading,
  } = useMyBookingsQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (!myBooking || !myBooking.data.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg p-6">
        <TbError404 style={{ fontSize: "100px" }} />
        <p className="text-lg font-semibold text-gray-600">No bookings found</p>
        <p className="text-sm text-gray-500 mt-2">
          You don’t have any bookings yet.
        </p>
      </div>
    );
  }

  const dataSource = myBooking.data?.map((booking: any) => ({
    key: booking._id,
    date: booking.date || "No Date Provided",
    isConfirmed:
      booking.isConfirmed !== undefined
        ? booking.isConfirmed
        : "Unknown Status",
    room: booking?.room?.name || "No Room Information",
    totalAmount: booking.totalAmount || "0",
    payment: booking.payment || "No Payment Info",
    transactionId: booking.transactionId || "No Transaction ID",
  }));

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg mt-6">
      <Divider style={{ fontSize: "35px", fontWeight: "bold" }}>
        My Booking List
      </Divider>
      <div style={{ overflowX: "auto" }}>
        <Table
          columns={columns}
          dataSource={dataSource}
          className="border-4 border-emerald-500 rounded-lg font-semibold"
          scroll={{ x: true }}
        />
      </div>
    </div>
  );
};

export default MyBooking;
