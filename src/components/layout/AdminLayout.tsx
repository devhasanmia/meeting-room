import { Layout, Menu } from "antd";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const items = [
  {
    key: "dashboard",
    label: <NavLink to={"/admin/dashboard"}>Dashboard</NavLink>,
  },
  {
    key: "room-management",
    label: "Room Management",
    children: [
      {
        key: "create-room",
        label: (
          <NavLink to={"/admin/dashboard/create-room"}>Create Room</NavLink>
        ),
      },
      {
        key: "room-list",
        label: <NavLink to={"/admin/dashboard/room-list"}>Room List</NavLink>,
      },
    ],
  },
  {
    key: "slots-management",
    label: "Slots Management",
    children: [
      {
        key: "create-slot",
        label: (
          <NavLink to={"/admin/dashboard/create-slots"}>Create Slots</NavLink>
        ),
      },
      {
        key: "slots-list",
        label: <NavLink to={"/admin/dashboard/slots-list"}>Slots List</NavLink>,
      },
    ],
  },
  {
    key: "user-list",
    label: <NavLink to={"/admin/dashboard/user-list"}>User List</NavLink>,
  },
  {
    key: "booking-list",
    label: <NavLink to={"/admin/dashboard/booking-list"}>Booking List</NavLink>,
  },
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className="min-h-screen">
      <Sider
        breakpoint="lg"
        collapsible
        collapsed={collapsed}
        onCollapse={(isCollapsed) => setCollapsed(isCollapsed)}
        collapsedWidth={80}
        className="bg-gray-800"
      >
        <div className="text-white text-center h-16 flex justify-center items-center">
          {!collapsed && (
            <Link to="/">
              <h1 className="text-2xl font-bold tracking-tight">
                <span>Meeting</span>
                <span className="text-[#ffb703] ml-2 animate-bounce">Room</span>
              </h1>
            </Link>
          )}
        </div>
        <Menu
          defaultSelectedKeys={["dashboard"]}
          items={items}
          theme="dark"
          className="bg-gray-800"
        />
      </Sider>
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
