import {Outlet} from "react-router";
import Navbar from "./Navbar";

type Props = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AppLayout({setIsLoggedIn}: Props) {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <Navbar setIsLoggedIn={setIsLoggedIn} />

      <div className="w-full h-full flex px-6 py-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
