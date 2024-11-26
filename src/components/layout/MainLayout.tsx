import { Outlet } from "react-router-dom";
import Footer from "../../pages/Footer/Footer";
import Navbar from "../Header/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar/>
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
