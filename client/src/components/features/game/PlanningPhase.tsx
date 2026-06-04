import {Link, useNavigate} from "react-router";
import Timer from "./Timer";
import stationsMap from "../../../assets/stations.png";

export default function PlanningPhase() {
  const navigate = useNavigate();
  const timeoutHandler = () => {
    alert("timeout");
    navigate("/game/evaluation");
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex items-center gap-8">
        <h2>2. Planning Phase</h2>
        <div className="flex gap-2">
          <p>Time left:</p>
          <Timer seconds={8} onTimeout={timeoutHandler} />
        </div>
      </div>
      <img className="w-2/5" src={stationsMap} alt="Stations Map" />

      <Link
        className="w-min min-w-50 text-center bg-indigo-800 hover:bg-indigo-700 duration-150 text-white p-2 rounded"
        to="/game/evaluation"
      >
        End
      </Link>
    </div>
  );
}
