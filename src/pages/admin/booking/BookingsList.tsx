import { Spin, Table, Modal } from "antd";
import { toast } from "sonner";
import {
  useBookingDeleteMutation,
  useBookingStatusUpdateMutation,
  useGetAllbookingsQuery,
} from "../../../redux/features/booking/bookingApi";
import { LoadingOutlined } from "@ant-design/icons";
import { HiCheck, HiX } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

const BookingsList = () => {
  const { data, isFetching } = useGetAllbookingsQuery(undefined);
  const [updateBookingStatus, { isLoading: isUpdating }] = useBookingStatusUpdateMutation();
  const [deleteBooking, { isLoading: isDeleting }] = useBookingDeleteMutation();
  const antIcon = <LoadingOutlined style={{ fontSize: 32, color: '#4f46e5' }} spin />;

  const handleStatusUpdate = async (id: string, isConfirmed: string) => {
    try {
      await updateBookingStatus({ id, isConfirmed }).unwrap();
      toast.success(`Booking status updated to ${isConfirmed} successfully`);
    } catch (error) {
      toast.error("Failed to update booking status");
    }
  };

  const handleBookingDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this booking?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteBooking(id).unwrap();
          toast.success("Booking deleted successfully");
        } catch (error) {
          toast.error("Failed to delete booking");
        }
      },
    });
  };

  const columns = [
    {
      title: "Room Name",
      dataIndex: "roomName",
      key: "roomName",
      render: (text: string) => <span className="font-bold text-slate-800">{text}</span>,
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <span className="font-semibold text-slate-600">{text}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "dateAndTime",
      key: "dateAndTime",
      render: (text: string) => <span className="text-slate-500 font-semibold text-xs leading-relaxed">{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex items-center space-x-2">
          {/* Approve Button */}
          <button
            onClick={() => handleStatusUpdate(record.key, "confirmed")}
            disabled={record.status === "confirmed"}
            className="flex justify-center items-center w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-600 hover:text-white disabled:opacity-40 disabled:hover:bg-emerald-50 disabled:hover:text-emerald-600 transition shadow-sm"
            title="Approve Booking"
          >
            <HiCheck size={16} />
          </button>
          
          {/* Reject Button */}
          <button
            onClick={() => handleStatusUpdate(record.key, "unconfirmed")}
            disabled={record.status === "unconfirmed"}
            className="flex justify-center items-center w-8 h-8 rounded-lg bg-amber-50 text-amber-600 border border-amber-100 hover:bg-amber-500 hover:text-white disabled:opacity-40 disabled:hover:bg-amber-50 disabled:hover:text-amber-600 transition shadow-sm"
            title="Reject Booking"
          >
            <HiX size={14} />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => handleBookingDelete(record.key)}
            className="flex justify-center items-center w-8 h-8 rounded-lg bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-600 hover:text-white transition shadow-sm"
            title="Delete Booking"
          >
            <MdDelete size={16} />
          </button>
        </div>
      ),
    },
  ];

  const dataSource = data?.data?.map((booking: any) => ({
    key: booking._id,
    roomName: booking.room?.name || "No Room Name",
    name: booking.user?.name || "No User Name",
    status: booking.isConfirmed,
    dateAndTime: booking.slots?.length
      ? `${booking.date} (${booking.slots[0]?.startTime} - ${booking.slots[0]?.endTime})`
      : `${booking.date} (No slot assigned)`,
  }));

  if (isFetching || isUpdating || isDeleting) {
    return (
      <div className="flex flex-col items-center justify-center h-60">
        <Spin indicator={antIcon} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Bookings Management</h2>
        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
          Approve, reject, or manage customer room bookings
        </p>
      </div>

      <div className="overflow-hidden border border-slate-100 rounded-xl shadow-sm">
        <Table
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: true }}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default BookingsList;
