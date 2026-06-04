import { Spin, Table, Modal } from "antd";
import {
  useDeleteSlotsMutation,
  useGetSlotsQuery,
} from "../../../redux/features/slots/slotsApi";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { LoadingOutlined } from "@ant-design/icons";
import { TbEditCircle } from "react-icons/tb";
import { MdDelete } from "react-icons/md";

const SlotsList = () => {
  const [deleteSlots, { isLoading: isDeleting }] = useDeleteSlotsMutation();
  const { data: slots, isFetching } = useGetSlotsQuery(undefined);
  const antIcon = <LoadingOutlined style={{ fontSize: 32, color: '#4f46e5' }} spin />;

  const handleSlotsDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this time slot?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteSlots(id).unwrap();
          toast.success("Slot deleted successfully");
        } catch (error) {
          toast.error("Slot deletion failed");
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
      title: "Room No.",
      dataIndex: "roomNo",
      key: "roomNo",
      render: (text: string) => <span className="font-semibold text-slate-500">{text}</span>,
    },
    {
      title: "Slot Date",
      dataIndex: "date",
      key: "date",
      render: (text: string) => <span className="text-slate-600 font-semibold">{text}</span>,
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (text: string) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
          {text}
        </span>
      ),
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (text: string) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
          {text}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex items-center space-x-2">
          <Link to={`/admin/slots-update/${record.key}`}>
            <button className="flex justify-center items-center w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-600 hover:text-white transition shadow-sm" title="Edit Slot">
              <TbEditCircle size={16} />
            </button>
          </Link>
          <button
            onClick={() => handleSlotsDelete(record.key)}
            className="flex justify-center items-center w-8 h-8 rounded-lg bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-600 hover:text-white transition shadow-sm"
            title="Delete Slot"
          >
            <MdDelete size={16} />
          </button>
        </div>
      ),
    },
  ];

  const dataSource = slots?.data?.map((slot: any) => ({
    key: slot._id,
    roomName: slot.room?.name || "No Room Name",
    roomNo: slot.room?.roomNo || "No Room Number",
    date: slot.date || "No Date Provided",
    startTime: slot.startTime || "No Start Time",
    endTime: slot.endTime || "No End Time",
  }));

  if (isFetching || isDeleting) {
    return (
      <div className="flex flex-col items-center justify-center h-60">
        <Spin indicator={antIcon} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Time Slots Management</h2>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
            Manage slot schedules for meeting rooms
          </p>
        </div>
        <Link to="/admin/create-slots">
          <button className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow transition">
            Add Time Slot
          </button>
        </Link>
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

export default SlotsList;
