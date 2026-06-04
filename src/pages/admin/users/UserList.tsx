import { Spin, Table, Modal } from "antd";
import { useDeleteUserMutation, useGetAllUserQuery, useRoleChangeMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";
import { LoadingOutlined } from "@ant-design/icons";
import { FiShield } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const UserList = () => {
  const { data: users, isFetching } = useGetAllUserQuery(undefined);
  const [changeUserRole, { isLoading: isUpdatingRole }] = useRoleChangeMutation();
  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation();
  const antIcon = <LoadingOutlined style={{ fontSize: 32, color: '#4f46e5' }} spin />;

  const changeRole = async (id: string, role: string) => {
    try {
      await changeUserRole({ id, role }).unwrap();
      toast.success("Role changed successfully");
    } catch (error) {
      toast.error("Failed to change role");
    }
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteUser(id).unwrap();
          toast.success("User deleted successfully");
        } catch (error) {
          toast.error("Failed to delete user");
        }
      },
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <span className="font-bold text-slate-800">{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => <span className="font-medium text-slate-500">{text}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text: string) => <span className="text-slate-600 font-semibold text-xs">{text || "N/A"}</span>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text: string) => <span className="text-slate-500 text-xs">{text || "N/A"}</span>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => {
        const isAdmin = role === "admin";
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
              isAdmin
                ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                : "bg-slate-50 text-slate-600 border border-slate-200/60"
            }`}
          >
            {role}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex items-center space-x-2">
          {/* Make Admin Button */}
          <button
            onClick={() => changeRole(record._id, "admin")}
            disabled={record.role === "admin"}
            className="flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-600 hover:text-white disabled:opacity-40 disabled:hover:bg-indigo-50 disabled:hover:text-indigo-600 transition shadow-sm text-xs font-bold"
            title="Make Admin"
          >
            <FiShield size={12} />
            <span>Make Admin</span>
          </button>

          {/* Delete User Button */}
          <button
            onClick={() => handleDelete(record._id)}
            disabled={record.role === "admin"}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-600 hover:text-white disabled:opacity-40 disabled:hover:bg-rose-50 disabled:hover:text-rose-600 transition shadow-sm"
            title="Delete User"
          >
            <MdDelete size={16} />
          </button>
        </div>
      ),
    },
  ];

  if (isFetching || isUpdatingRole || isDeletingUser) {
    return (
      <div className="flex flex-col items-center justify-center h-60">
        <Spin indicator={antIcon} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Users Management</h2>
        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
          View users and assign administrative roles
        </p>
      </div>

      <div className="overflow-hidden border border-slate-100 rounded-xl shadow-sm">
        <Table
          columns={columns}
          dataSource={users?.data}
          scroll={{ x: true }}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default UserList;
