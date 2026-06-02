import {Link} from "react-router";

export default function SetupPhase() {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h1>Setup</h1>
      <div>MAP 1</div>
      <div className="flex flex-col gap-2">
        <p>Memorize the stations and connections.</p>
        <p>When you are ready, click the start button.</p>
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
