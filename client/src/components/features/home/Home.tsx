import Leaderboard from "../leaderboard/Leaderboard";
import Instructions from "../instructions/Instructions";
import {Link} from "react-router";

export default function Home() {
  return (
    <div className="w-full h-full flex justify-between gap-4">
      <div className="w-full h-full flex flex-col items-start p-4 gap-8">
        <Instructions />
        <Link
          className="w-min min-w-50 text-center bg-blue-800 hover:bg-blue-700 duration-150 text-white p-2 rounded"
          to="/game/setup"
        >
          Play
        </Link>
      </div>
      <Leaderboard />
    </div>
  );
}
