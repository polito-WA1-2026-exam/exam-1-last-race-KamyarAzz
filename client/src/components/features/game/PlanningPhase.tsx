import React from "react";
import {Link} from "react-router";
import Timer from "./Timer";

export default function PlanningPhase() {
  const timeoutHandler = () => {
    alert("timeout");
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h1>Planning</h1>
      <div>MAP 2</div>
      <div className="flex gap-2">
        <p>Time left:</p>
        <Timer seconds={8} onTimeout={timeoutHandler} />
      </div>

      <Link
        className="w-min min-w-50 text-center bg-indigo-800 hover:bg-indigo-700 duration-150 text-white p-2 rounded"
        to="/game/evaluation"
      >
        End
      </Link>
    </div>
  );
}
