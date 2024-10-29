import { Button, Table } from "antd";
import {
  useDeleteSlotsMutation,
  useGetSlotsQuery,
} from "../../../redux/features/slots/slotsApi";
import { Link } from "react-router-dom";
// import { toast } from "sonner";

const SlotsList = () => {
  const [deleteSlots, { isSuccess }] = useDeleteSlotsMutation();
  const handleSlotsDelete = async (id: string) => {
    try {
      const res = await deleteSlots(id).unwrap();
      if (isSuccess) {
        console.log(res.message);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  const columns = [
    {
      title: "Room Name",
      dataIndex: "roomName",
      key: "roomName",
    },
    {
      title: "Room No.",
      dataIndex: "roomNo",
      key: "roomNo",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Link to={`/admin/slots-update/${record.key}`}>
            <Button>Update</Button>
          </Link>
          <Button
            onClick={() => handleSlotsDelete(record.key)}
            type="default"
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </Button>
        </div>
      ),
    }
  ];
  const { data: slots, isFetching } = useGetSlotsQuery(undefined);
  const dataSource = slots?.data?.map((slot: any) => ({
    key: slot._id,
    roomName: slot.room?.name || "No Room Name",
    roomNo: slot.room?.roomNo || "No Room Number",
    date: slot.date || "No Date Provided",
    startTime: slot.startTime || "No Start Time",
    endTime: slot.endTime || "No End Time",
  }));

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} loading={isFetching} />
    </div>
  );
};

export default SlotsList;
