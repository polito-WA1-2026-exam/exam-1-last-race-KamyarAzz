import {useState} from "react";
import {Link, useNavigate} from "react-router";
import {logOut} from "../../api/auth";

type Props = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navbar({setIsLoggedIn}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      setLoading(true);
      await logOut();
      setIsLoggedIn(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="px-6 py-4 border-b flex justify-between">
      <Link className="text-2xl font-bold text-white" to="/home">
        Last Run
      </Link>
      <button
        disabled={loading}
        onClick={handleLogout}
        className="hover:underline disabled:cursor-not-allowed text-white cursor-pointer"
      >
        Logout
      </button>
    </nav>
  );
}
