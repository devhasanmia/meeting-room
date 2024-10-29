import { Button, Divider, Table } from "antd";
import { toast } from "sonner";
import {
  useBookingDeleteMutation,
  useBookingStatusUpdateMutation,
  useGetAllbookingsQuery,
} from "../../../redux/features/booking/bookingApi";

const BookingsList = () => {
  const { data, isFetching } = useGetAllbookingsQuery(undefined);
  const [updateBookingStatus] = useBookingStatusUpdateMutation();
  const [deleteBooking] = useBookingDeleteMutation();

  const handleStatusUpdate = async (id: string, isConfirmed: string) => {
    try {
      await updateBookingStatus({ id, isConfirmed });
      toast.success("Booking status updated successfully");
    } catch (error) {
      toast.error("Failed to update booking status");
    }
  };

  const handleBookingDelete = async (id: string) => {
    try {
      await deleteBooking(id);
      toast.success("Booking deleted successfully");
    } catch (error) {
      toast.error("Failed to delete booking");
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
    <div>
      <Divider>Booking List</Divider>
      <Table columns={columns} dataSource={dataSource} loading={isFetching} />
    </div>
  );
};

export default BookingsList;
