import {Link} from "react-router";

export default function Navbar() {
  return (
    <nav className="px-6 py-4 border-b flex justify-between">
      <Link className="text-2xl font-bold text-white" to="/home">
        Last Run
      </Link>
      <p className="hover:underline text-white cursor-pointer">Logout</p>
    </nav>
  );
}
