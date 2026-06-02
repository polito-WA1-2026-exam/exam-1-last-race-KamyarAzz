import {Outlet} from "react-router";
import Navbar from "./Navbar";

export default function AppLayout() {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <Navbar />

      <div className="w-full h-full flex px-6 py-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
