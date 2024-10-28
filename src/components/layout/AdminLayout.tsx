import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./admin/Sidebar";
const { Header, Content } = Layout;
const AdminLayout = () => {
  return (
    <Layout className="min-h-screen">
      <Sidebar />
      <Layout>
        <Header className="bg-gray-800 text-white flex items-center justify-center">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </Header>
        <Content className="m-6">
          <div className="p-6 min-h-[360px] bg-gray-100 rounded-lg">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
