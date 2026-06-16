import {GameEvent} from "../../../../types/network";
import coins from "../../../../assets/coins.png";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {AxiosError} from "axios";
import {api} from "../../../../api/axios";

type Props = {events: GameEvent[]; baseCoin: number};

export default function CoinCard({events, baseCoin}: Props) {
  const [totalCoins, setTotalCoins] = useState(baseCoin);
  const navigate = useNavigate();

  useEffect(() => {
    let currentCoins = baseCoin;

    events.forEach((event, index) => {
      const delay = index * 600 + 2400;

      setTimeout(() => {
        currentCoins += event.effect;
        setTotalCoins(currentCoins);
      }, delay);
    });
  }, [events, baseCoin]);

  const calculateFinalCoins = () => {
    let finalCoins = baseCoin;
    for (let i = 0; i < events.length; i++) {
      finalCoins += events[i].effect;
    }
    return finalCoins;
  };

  const submit = async () => {
    try {
      const finalCoins = calculateFinalCoins();
      await api.post("/games/leaderboard", {
        score: finalCoins,
      });
      navigate("/game/result");
    } catch (err) {
      if (err instanceof AxiosError) {
        const serverMessage =
          err.response?.data?.error || err.response?.data?.message;
        throw new Error(serverMessage || "Failed to submit.");
      }
      throw new Error("An unexpected error occurred during submition.");
    }
  };

  return (
    <div className="flex flex-col w-full h-full gap-4 items-start justify-between border-2 px-3 py-2 rounded-md">
      <div className="flex flex-col items-center w-full h-full">
        <p className="text-white text-start w-full">Score:</p>
        <div className="w-full flex h-full items-center justify-center mb-2 gap-2">
          <p
            className="text-white text-4xl font-bold"
            style={{
              animation: `scaleUp 600ms ease-out forwards`,
            }}
          >
            {totalCoins}
          </p>
          <img className="w-16 h-16" src={coins} alt="Coins" />
        </div>
      </div>
      <button
        className="w-full cursor-pointer min-w-50 text-center bg-blue-800 hover:bg-blue-700 duration-150 text-white p-2 rounded"
        onClick={submit}
      >
        Finish
      </button>
    </div>
  );
}
