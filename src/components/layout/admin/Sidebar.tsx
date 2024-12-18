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
  const [collapsed, _setCollapsed] = useState(false);

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
  switch ((user as TUser)!.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
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
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems as ItemType<MenuItemType>[]}
      />
    </Sider>
  );
};

export default Sidebar;
