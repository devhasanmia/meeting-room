import { Button, Table } from "antd";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
  useRoleChangeMutation,
} from "../../redux/features/auth/authApi";

const UserList = () => {
  const { data: users, isError } = useGetAllUserQuery(undefined);
  const [changeUserRole] = useRoleChangeMutation();
  const [deleteUser] = useDeleteUserMutation();
  if (isError) {
    return <div>Error</div>;
  }

  if (!users || !users.data || users.data.length === 0) {
    return <div>No User Found</div>;
  }

  const changeRole = async (id: string, role: string) => {
    try {
      await changeUserRole({ id, role });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
    } catch (error) {
      console.log(error);
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
          <Button type="primary" disabled={record.role === "user"}>
            User
          </Button>
          <Button
            onClick={() => changeRole(record._id, "admin")}
            className="bg-emerald-400 hover:bg-emerald-600 text-white"
            disabled={record.role === "admin"}
          >
            Admin
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
      <Table columns={columns} dataSource={users.data} />
    </div>
  );
};

export default UserList;
