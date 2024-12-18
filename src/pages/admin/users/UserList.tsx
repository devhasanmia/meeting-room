import { Button, Divider, Table } from "antd";
import { useDeleteUserMutation, useGetAllUserQuery, useRoleChangeMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";


const UserList = () => {
  const { data: users, isFetching } = useGetAllUserQuery(undefined);
  const [changeUserRole] = useRoleChangeMutation();
  const [deleteUser] = useDeleteUserMutation();

  const changeRole = async (id: string, role: string) => {
    try {
      await changeUserRole({ id, role }).unwrap();
      toast.success("Role changed successfully");
    } catch (error) {
      toast.error("Failed to change role");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button
            onClick={() => changeRole(record._id, "admin")}
            className="bg-emerald-400 hover:bg-emerald-600 text-white"
            disabled={record.role === "admin"}
          >
            Make a Admin
          </Button>
          <Button
            onClick={() => handleDelete(record._id)}
            className="bg-red-500 text-white"
            type="primary"
            disabled={record.role === "admin"}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Divider>Only User List</Divider>
      <Table columns={columns} dataSource={users?.data} loading={isFetching} />
    </div>
  );
};

export default UserList;
