import { Layout, Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import adminPaths from "../../../routes/admin.routes";
import { tokenVerify } from "../../../utils/tokenVerify";
import { useAppSelector } from "../../../redux/hooks";
import { sidebarItemsGenerator } from "../../../utils/sidebarItemsGenerator";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { TUser } from "../../../redux/features/auth/authSlice";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const userRole = {
    ADMIN: "admin",
    USER: "user",
  };
  const token = useAppSelector((state) => state?.auth?.token);

  let user;
  if (token) {
    user = tokenVerify(token);
  }

  let sidebarItems;
  switch ((user as TUser)?.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="80"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="border-r border-slate-800 shadow-xl"
    >
      {/* Brand logo container */}
      <div className="text-white text-center h-16 flex justify-center items-center px-4 border-b border-slate-800/60 mb-4">
        <Link to="/" className="flex items-center space-x-2">
          {!collapsed ? (
            <h1 className="text-lg font-black tracking-tight flex items-center">
              <span className="text-white">Meeting</span>
              <span className="text-indigo-400 ml-1.5 px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded-md">Room</span>
            </h1>
          ) : (
            <span className="text-xl font-black text-indigo-400 bg-indigo-500/10 w-9 h-9 flex items-center justify-center border border-indigo-500/20 rounded-lg">
              MR
            </span>
          )}
        </Link>
      </div>

      {/* Navigation menu list */}
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["Dashboard"]}
        items={sidebarItems as ItemType<MenuItemType>[]}
        className="font-medium"
      />
    </Sider>
  );
};

export default Sidebar;
