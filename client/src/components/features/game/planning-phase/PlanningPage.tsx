import {useNavigate} from "react-router";
import Timer from "../timer/Timer";
import stationsMap from "../../../../assets/stations.png";
import {useEffect, useState} from "react";
import {AxiosError} from "axios";
import {api} from "../../../../api/axios";
import ErrorPage from "../../auth/ErrorPage";
import Loading from "../../../ui/Loading";
import GameRoutesContainer from "./GameRoutesContainer";
import {useGameContext} from "../../../../context/GameContext";
import type {Network, Segment} from "../../../../types/network";
import TimerContainer from "../timer/TimerContainer";

type SubmitPayload = {
  start: string;
  destination: string;
  segments: Segment[];
};

type RandomStations = {
  destination: string;
  start: string;
};

const initialRandomStations = {
  destination: "",
  start: "",
};

export default function PlanningPage() {
  const [network, setNetwork] = useState<Network>();
  const [randomStations, setRandomStations] = useState<RandomStations>(
    initialRandomStations,
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chosenRoutes, setChosenRoutes] = useState<Segment[]>([]);
  const {setGameState} = useGameContext();

  const navigate = useNavigate();

  const timeoutHandler = () => {
    submit({
      start: randomStations.start,
      destination: randomStations.destination,
      segments: chosenRoutes,
    });
  };

  const fetchGameConfig = async () => {
    setLoading(true);
    setError(null);
    try {
      const networkResponse = await api.get("/games/network");
      const randomStationsResponse = await api.get("/games/random-stations");
      setNetwork(networkResponse.data);
      setRandomStations(randomStationsResponse.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        const serverMessage = err.response?.data?.message;
        setError(serverMessage || err.message || "Failed to fetch network.");
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Network fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGameConfig();
  }, []);

  const submit = async (payload: SubmitPayload) => {
    try {
      const response = await api.post("/games/validate-route", payload);
      const gameData = response.data;

      setGameState({
        selectedSegments: chosenRoutes,
        events: gameData.events ?? [],
        baseCoin: gameData.baseCoins ?? 0,
        finalCoins: gameData.finalCoins ?? 0,
        reason: gameData.reason ?? "",
      });

      if (gameData.valid) {
        navigate("/game/execution");
      } else {
        navigate("/game/result");
      }
      return gameData;
    } catch (err) {
      if (err instanceof AxiosError) {
        const serverMessage =
          err.response?.data?.error || err.response?.data?.message;
        throw new Error(serverMessage || "Failed to submit.");
      }
      throw new Error("An unexpected error occurred during submission.");
    }
  };

  return loading ? (
    <div className="w-full h-full items-center justify-center flex">
      <Loading />
    </div>
  ) : error || !network ? (
    <ErrorPage error={error} />
  ) : (
    <div className="w-full h-full flex flex-col gap-4 p-4 min-h-0 box-border">
      <div className="flex flex-col sm:flex-row justify-between w-full items-center gap-4">
        <h2 className="text-xl font-bold">2. Planning Phase</h2>
        <TimerContainer seconds={90} timeoutHandler={timeoutHandler} />
      </div>
      <div className="flex flex-col lg:flex-row gap-6 flex-1 w-full min-h-0 overflow-y-auto lg:overflow-hidden pb-2">
        <div className="flex flex-col gap-4 w-full lg:w-2/5 xl:w-1/3 shrink-0 min-h-0">
          <div className="flex flex-col sm:flex-row gap-2 items-stretch text-white w-full">
            <div className="flex-1 flex flex-col justify-center items-center gap-1 border p-3 text-center rounded-lg border-green-600/50 bg-green-600/30 shadow-sm wrap-break-word">
              <span className="text-xs uppercase tracking-wider opacity-80">
                Start
              </span>
              <b className="text-lg">{randomStations.start}</b>
            </div>
            <div className="hidden sm:flex items-center justify-center text-2xl font-bold text-gray-400">
              →
            </div>
            <div className="flex-1 flex flex-col justify-center items-center gap-1 border p-3 text-center rounded-lg border-red-600/50 bg-red-600/30 shadow-sm wrap-break-word">
              <span className="text-xs uppercase tracking-wider opacity-80">
                Destination
              </span>
              <b className="text-lg">{randomStations.destination}</b>
            </div>
          </div>
          <img
            className="w-full max-h-[40vh] lg:max-h-full rounded-md"
            src={stationsMap}
            alt="Stations Map"
          />
        </div>
        <div className="flex-1 min-w-0 min-h-0 flex flex-col">
          <GameRoutesContainer
            chosenRoutes={chosenRoutes}
            setChosenRoutes={setChosenRoutes}
            segments={network.segments}
          />
        </div>
      </div>
      <div className="mt-auto pt-2 flex justify-center shrink-0">
        <button
          className="w-full sm:w-auto min-w-50 cursor-pointer text-center bg-blue-600 hover:bg-blue-500 transition-colors text-white py-3 px-6 rounded-lg font-bold shadow-md"
          onClick={() =>
            submit({
              start: randomStations.start,
              destination: randomStations.destination,
              segments: chosenRoutes,
            })
          }
        >
          Submit Route
        </button>
      </div>
    </div>
  );
}
