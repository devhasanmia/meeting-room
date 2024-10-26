import { Divider, Spin, Table } from "antd";
import { useMyBookingsQuery } from "../../redux/features/room/roomApi";
import { TbError404 } from "react-icons/tb";

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
    dataIndex: ["room", "name"],
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
    isError,
    isLoading,
    error,
  } = useMyBookingsQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (isError) {
    console.log(error);
    return (
      <p className="text-center text-red-500">
        Error: Unable to fetch bookings.
      </p>
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

  const dataSource = myBooking.data.map((booking: any) => ({
    key: booking._id,
    date: booking.date,
    isConfirmed: booking.isConfirmed,
    room: booking.room,
    totalAmount: booking.totalAmount,
    payment: booking.payment,
    transactionId: booking.transactionId,
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
