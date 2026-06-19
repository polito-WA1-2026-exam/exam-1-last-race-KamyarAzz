import {Link, useNavigate} from "react-router";
import networkMap from "../../../../assets/network.png";
import Timer from "../timer/Timer";
import TimerContainer from "../timer/TimerContainer";

export default function SetupPage() {
  const navigate = useNavigate();
  const timeoutHandler = () => {
    navigate("/game/planning");
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-4">
      <div className="flex flex-col sm:flex-row justify-between w-full items-center gap-4">
        <h2 className="text-xl font-bold">1. Setup Phase</h2>
        <TimerContainer seconds={10} timeoutHandler={timeoutHandler} />
      </div>
      <img
        className="w-2/5 min-w-125 rounded-md"
        src={networkMap}
        alt="Stations Map"
      />
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
