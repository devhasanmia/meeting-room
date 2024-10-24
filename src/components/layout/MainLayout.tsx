import { Outlet } from "react-router-dom";
import TopHeader from "../Header/TopNavbar";
import Footer from "../../pages/Footer/Footer";
import Navbar from "../Header/Navbar";

const MainLayout = () => {
  return (
    <>
      <TopHeader />
      <Navbar/>
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
