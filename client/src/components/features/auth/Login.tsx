import {Link} from "react-router";
import StationElement from "../../ui/StationElement";
import {useState} from "react";
import {logIn} from "../../../api/auth";

type Props = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Login({setIsLoggedIn}: Props) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await logIn({username, password});
      setIsLoggedIn(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full px-12 relative overflow-hidden">
      <StationElement position="left" />
      <StationElement position="right" />
      <h1 className="text-center pt-6">LAST RUN</h1>
      <form
        onSubmit={handleLogin}
        className="flex  text-center flex-col gap-4 mt-12 w-full max-w-md mx-auto justify-center border rounded-2xl p-6 shadow-lg"
      >
        <h2>Login</h2>
        <input
          className="p-2 rounded border w-full"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="p-2 rounded border w-full"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <input
          className="p-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-indigo-900 rounded cursor-pointer mt-3 text-white bg-indigo-900 hover:bg-indigo-800 duration-150 w-full"
          type="submit"
          value="Login"
          disabled={loading || !username || !password}
        />
        <Link
          to="/instructions"
          className="cursor-pointer hover:underline text-sm text-center text-gray-400"
        >
          Continue as guest
        </Link>
      </form>
    </div>
  );
}
