import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar/Navar";
import Footer from "../Components/Shared/Footer/Footer";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="pt-28 min-h-[calc(100vh-60px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Main;
