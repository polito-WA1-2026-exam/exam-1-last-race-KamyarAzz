import {Link} from "react-router";
import networkMap from "../../../assets/network.png";

export default function SetupPhase() {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h2>1. Setup Phase</h2>
      <img className="w-2/5" src={networkMap} alt="Stations Map" />
      <div className="flex flex-col gap-2">
        <p>
          Memorize the stations and connections. When you are ready, click the
          start button.
        </p>
        <Link
          className="w-min min-w-50 text-center mt-4 bg-indigo-800 hover:bg-indigo-700 duration-150 text-white p-2 rounded"
          to="/game/planning"
        >
          Start
        </Link>
      </div>
    </div>
  );
}
