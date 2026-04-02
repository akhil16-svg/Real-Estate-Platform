import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar.jsx";

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
