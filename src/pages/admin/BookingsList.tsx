import { Button, Table } from "antd";
import {
  useBookingRoomDeleteMutation,
  useGetAllbookingsQuery,
  useRoomBookingStatusUpdateMutation,
} from "../../redux/features/room/roomApi";

const BookingsList = () => {
  const { data, isLoading, isError, isFetching } = useGetAllbookingsQuery(undefined);
  const [updateBookingStatus] = useRoomBookingStatusUpdateMutation();
  const [deleteBooking] = useBookingRoomDeleteMutation();

  const handleStatusUpdate = async (id: string, isConfirmed: string) => {
    try {
      await updateBookingStatus({ id, isConfirmed });
    } catch (error) {
      console.error(`Error updating booking status to ${isConfirmed}:`, error);
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

  const dataSource = data?.data?.map((booking: any) => ({
    key: booking._id,
    roomName: booking.room?.name || "No Room Name",
    name: booking.user?.name || "No User Name",
    status: booking.isConfirmed,
    dateAndTime: booking.slots.length
      ? `${booking.date} Start Time: ${booking.slots[0]?.startTime} End Time: ${booking.slots[0]?.endTime}`
      : `${booking.date} - No slots available`,
  }));

  return (
    <Table columns={columns} dataSource={dataSource} loading={isFetching} />
  );
};

export default BookingsList;
