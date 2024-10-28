import { Button, Spin, Table } from "antd";
import {
  useBookingRoomDeleteMutation,
  useGetAllbookingsQuery,
  useRoomBookingStatusUpdateMutation,
} from "../../redux/features/room/roomApi";

const BookingsList = () => {
  const { data, isLoading, isError } = useGetAllbookingsQuery(undefined);
  const [updateBookingStatus] = useRoomBookingStatusUpdateMutation();
  const [deleteBooking] = useBookingRoomDeleteMutation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        An error occurred while fetching bookings.
      </p>
    );
  }

  if (!data?.data || data?.data?.length === 0) {
    return <p className="text-center text-red-500">No bookings found.</p>;
  }

  const handleStatusUpdate = async (id: string, isConfirmed: string) => {
    try {
      await updateBookingStatus({ id, isConfirmed });
    } catch (error) {
      console.error(`Error updating booking status to ${status}:`, error);
    }
  };
  const handleBookingDelete = async (id: string) => {
    try {
      await deleteBooking(id);
    } catch (error) {
      console.error(`Error deleting booking with id ${id}:`, error);
    }
  };

  const columns = [
    {
      title: "Room Name",
      dataIndex: "roomName",
      key: "roomName",
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date & Time",
      dataIndex: "dateAndTime",
      key: "dateAndTime",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button
            onClick={() => handleStatusUpdate(record.key, "confirmed")}
            type="primary"
            disabled={record.status === "confirmed"}
          >
            Approve
          </Button>
          <Button
            onClick={() => handleStatusUpdate(record.key, "unconfirmed")}
            type="default"
            disabled={record.status === "unconfirmed"}
          >
            Reject
          </Button>
          <Button
            onClick={() => handleBookingDelete(record.key)}
            type="default"
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const dataSource = data.data.map((booking: any) => ({
    key: booking._id,
    roomName: booking.room.name,
    name: booking.user.name,
    status: booking.isConfirmed,
    dateAndTime: `${booking.date} Start Time: ${booking.slots[0].startTime} End Time: ${booking.slots[0].endTime}`,
  }));

  return <Table columns={columns} dataSource={dataSource} />;
};

export default BookingsList;
