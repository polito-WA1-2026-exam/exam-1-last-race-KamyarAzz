import {useNavigate} from "react-router";
import {useGameContext} from "../../../../context/GameContext";

export default function ResultPage() {
  const navigate = useNavigate();
  const {finalCoins, reason, resetGameState} = useGameContext();
  const displayScore = Math.max(0, finalCoins);

  const handleNewGame = () => {
    resetGameState();
    navigate("/game/setup");
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-6 text-center">
      <div className="rounded-xl border-2 border-white/20 bg-slate-950/80 p-8 max-w-xl w-full">
        <h2 className="text-3xl font-bold text-white mb-4">Final Result</h2>
        <p className="text-slate-300 mb-4">
          Your final score corresponds to the coins remaining in the game.
          Negative values are shown as zero.
        </p>
        <div className="my-6">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
            Final score
          </p>
          <p className="text-6xl font-bold text-white">{displayScore}</p>
        </div>
        {reason && (
          <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 mb-4 text-left">
            <p className="text-red-200 font-semibold">Route validation error</p>
            <p className="text-red-100">{reason}</p>
          </div>
        )}
        <button
          className="cursor-pointer w-full bg-blue-800 hover:bg-blue-700 duration-150 text-white p-3 rounded"
          onClick={handleNewGame}
        >
          Start a new game
        </button>
      </div>
    </div>
  );
}
