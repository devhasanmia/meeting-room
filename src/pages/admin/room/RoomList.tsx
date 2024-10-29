import { MdDelete } from "react-icons/md";
import { Spin, Table, Divider, Modal } from "antd";
import { Link } from "react-router-dom";
import { TbEditCircle } from "react-icons/tb";
import { useGetRoomByIdAndDeleteMutation, useGetRoomsQuery } from "../../../redux/features/room/roomApi";

const columns = (handleDelete: (id: string) => void) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Room No",
    dataIndex: "roomNo",
    key: "roomNo",
  },
  {
    title: "Capacity",
    dataIndex: "capacity",
    key: "capacity",
  },
  {
    title: "Price Per Slot",
    dataIndex: "pricePerSlot",
    key: "pricePerSlot",
  },
  {
    title: "Action",
    key: "action",
    render: (_: any, record: any) => (
      <div className="flex gap-2">
        <Link to={`/admin/room-update/${record.key}`}>
        <button className="bg-green-500 p-3 text-2xl hover:bg-green-600 text-white rounded-md">
            <TbEditCircle />
          </button>
        </Link>
        <button
          onClick={() => handleDelete(record.key)}
          className="bg-red-500 text-white hover:bg-red-600 text-2xl p-3 rounded-md"
        >
          <MdDelete />
        </button>
      </div>
    ),
  },
];

const RoomList = () => {
  const [deleteRoom, { isLoading }] = useGetRoomByIdAndDeleteMutation();
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this room?",
      onOk: async () => {
        isLoading;
        try {
          await deleteRoom(id).unwrap();
        } catch (error) {
          console.error("Failed to delete room: ", error);
        } finally {
          isLoading;
        }
      },
    });
  };

  const {
    data: roomList,
    isLoading: isRoomsLoading,
  } = useGetRoomsQuery(undefined);

  if (isRoomsLoading || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Spin />
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
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <Divider style={{ fontSize: 25, fontWeight: "bold" }}>
          Room List
        </Divider>
        <div style={{ overflowX: "auto" }}>
          <Table
            columns={columns(handleDelete)}
            dataSource={dataSource}
            scroll={{ x: true }}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomList;
