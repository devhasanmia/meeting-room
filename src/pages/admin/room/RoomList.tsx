import { MdDelete } from "react-icons/md";
import { Spin, Table, Modal } from "antd";
import { Link } from "react-router-dom";
import { TbEditCircle } from "react-icons/tb";
import { useGetRoomByIdAndDeleteMutation, useGetRoomsQuery } from "../../../redux/features/room/roomApi";
import { LoadingOutlined } from "@ant-design/icons";

const columns = (handleDelete: (id: string) => void) => [
  {
    title: "Room Name",
    dataIndex: "name",
    key: "name",
    render: (text: string) => <span className="font-bold text-slate-800">{text}</span>,
  },
  {
    title: "Room No",
    dataIndex: "roomNo",
    key: "roomNo",
    render: (text: number) => <span className="font-semibold text-slate-500">{text}</span>,
  },
  {
    title: "Capacity",
    dataIndex: "capacity",
    key: "capacity",
    render: (text: number) => <span className="font-semibold text-slate-600">{text} People</span>,
  },
  {
    title: "Price per Slot",
    dataIndex: "pricePerSlot",
    key: "pricePerSlot",
    render: (text: number) => <span className="font-bold text-indigo-600">${text}</span>,
  },
  {
    title: "Action",
    key: "action",
    render: (_: any, record: any) => (
      <div className="flex items-center space-x-2">
        <Link to={`/admin/room-update/${record.key}`}>
          <button className="flex justify-center items-center w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-600 hover:text-white transition shadow-sm" title="Edit Room">
            <TbEditCircle size={16} />
          </button>
        </Link>
        <button
          onClick={() => handleDelete(record.key)}
          className="flex justify-center items-center w-8 h-8 rounded-lg bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-600 hover:text-white transition shadow-sm"
          title="Delete Room"
        >
          <MdDelete size={16} />
        </button>
      </div>
    ),
  },
];

const RoomList = () => {
  const [deleteRoom, { isLoading }] = useGetRoomByIdAndDeleteMutation();
  const antIcon = <LoadingOutlined style={{ fontSize: 32, color: '#4f46e5' }} spin />;

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this room?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteRoom(id).unwrap();
        } catch (error) {
          console.error("Failed to delete room: ", error);
        }
      },
    });
  };

  const { data: roomList, isLoading: isRoomsLoading } = useGetRoomsQuery(undefined);

  if (isRoomsLoading || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-60">
        <Spin indicator={antIcon} />
      </div>
    );
  }

  const dataSource = roomList?.data?.map((room: any) => ({
    key: room._id,
    name: room.name,
    roomNo: room.roomNo,
    capacity: room.capacity,
    pricePerSlot: room.pricePerSlot,
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Rooms Management</h2>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
            List of all meeting rooms registered
          </p>
        </div>
        <Link to="/admin/create-room">
          <button className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow transition">
            Add Room
          </button>
        </Link>
      </div>

      <div className="overflow-hidden border border-slate-100 rounded-xl shadow-sm">
        <Table
          columns={columns(handleDelete)}
          dataSource={dataSource}
          scroll={{ x: true }}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default RoomList;
