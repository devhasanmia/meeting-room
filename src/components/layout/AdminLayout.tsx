import { Layout } from "antd";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Sidebar from "./admin/Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { HiOutlineLogout, HiOutlineHome } from "react-icons/hi";

const { Header, Content } = Layout;

const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <Layout className="min-h-screen">
      <Sidebar />
      <Layout className="bg-slate-50">
        {/* Top Header */}
        <Header className="bg-white border-b border-slate-200/60 px-6 flex items-center justify-between shadow-sm h-16 shrink-0">
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-800 tracking-tight">Admin Dashboard</h2>
            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase rounded-md tracking-wider">
              Control Panel
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Back to Home Link */}
            <Link
              to="/"
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-indigo-600 hover:border-indigo-100 transition shadow-sm"
              title="View Home Site"
            >
              <HiOutlineHome size={18} />
            </Link>

            {/* Logout Link */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-red-100 bg-red-50 text-red-500 hover:bg-red-600 hover:text-white transition shadow-sm"
              title="Logout"
            >
              <HiOutlineLogout size={18} />
            </button>
          </div>
        </Header>

        {/* Content Panel */}
        <Content className="p-6 md:p-8">
          <div className="p-6 md:p-8 bg-white border border-slate-200/60 rounded-2xl shadow-sm min-h-[calc(100vh-140px)]">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
