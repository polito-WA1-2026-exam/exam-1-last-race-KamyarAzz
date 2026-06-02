import StationElement from "../ui/StationElement";

export default function Login() {
  return (
    <div className="min-h-screen w-full px-12 relative overflow-hidden">
      <StationElement position="left" />
      <StationElement position="right" />
      <h1 className="text-center pt-6">LAST RUN</h1>
      <form
        action=""
        className="flex  text-center flex-col gap-4 mt-12 items-center w-full max-w-md mx-auto justify-center border rounded-2xl p-6 shadow-lg"
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
          className="p-2 rounded border cursor-pointer mt-10 hover:bg-gray-800 duration-150 w-full"
          type="submit"
          value="Login"
        />
      </form>
    </div>
  );
}
