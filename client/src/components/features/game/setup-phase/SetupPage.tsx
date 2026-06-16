import {Link, useNavigate} from "react-router";
import networkMap from "../../../../assets/network.png";
import Timer from "../Timer";

export default function SetupPage() {
  const navigate = useNavigate();
  const timeoutHandler = () => {
    navigate("/game/planning");
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-4">
      <div className="flex items-center gap-8 w-full">
        <h2>1. Setup Phase</h2>
        <div className="flex gap-2 items-center">
          <p>Time left:</p>
          <Timer seconds={10} onTimeout={timeoutHandler} />
        </div>
      </div>
      <img className="w-2/5 rounded-md" src={networkMap} alt="Stations Map" />
      <div className="flex flex-col gap-2 items-center">
        <p>
          Memorize the stations and connections. When you are ready, click the
          start button.
        </p>
        <Link
          className="w-min min-w-50 text-center mt-2 bg-blue-800 hover:bg-blue-700 duration-150 text-white p-2 rounded"
          to="/game/planning"
        >
          Start
        </Link>
      </div>
    </div>
  );
}
