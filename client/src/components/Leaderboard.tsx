import {useState, useEffect} from "react";
import {AxiosError} from "axios";
import {api} from "../api/axios";
import Loading from "./ui/Loading";

type LeaderboardItem = {
  username: string;
  bestScore: number;
};

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/games/leaderboard");
      setLeaderboard(response.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        const serverMessage = err.response?.data?.message;
        setError(
          serverMessage || err.message || "Failed to fetch leaderboard.",
        );
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Leaderboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="border h-full rounded-xl gap-2 min-w-75 p-4 flex flex-col">
      <h2 className="text-center border-b pb-2">Leaderboard</h2>
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loading />
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        leaderboard.map((player, i) => (
          <div
            className="border flex rounded-lg justify-between p-2 gap-8"
            key={i}
          >
            <p>Username: {player.username}</p>
            <p>Score: {player.bestScore}</p>
          </div>
        ))
      )}
    </div>
  );
}
