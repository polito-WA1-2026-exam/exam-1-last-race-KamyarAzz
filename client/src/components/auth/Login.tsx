import {Link} from "react-router";
import StationElement from "../ui/StationElement";

export default function Login() {
  return (
    <div className="min-h-screen w-full px-12 relative overflow-hidden">
      <StationElement position="left" />
      <StationElement position="right" />
      <h1 className="text-center pt-6">LAST RUN</h1>
      <form
        action=""
        className="flex  text-center flex-col gap-4 mt-12 w-full max-w-md mx-auto justify-center border rounded-2xl p-6 shadow-lg"
      >
        <h2>Login</h2>
        <input
          className="p-2 rounded border w-full"
          type="text"
          placeholder="Username"
        />
        <input
          className="p-2 rounded border w-full"
          type="password"
          placeholder="Password"
        />
        <input
          className="p-2 rounded cursor-pointer mt-3 text-white bg-indigo-900 hover:bg-indigo-800 duration-150 w-full"
          type="submit"
          value="Login"
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
