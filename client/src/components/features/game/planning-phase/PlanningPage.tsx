import {Link, useNavigate} from "react-router";
import Timer from "../Timer";
import stationsMap from "../../../../assets/stations.png";
import {useEffect, useState} from "react";
import {AxiosError} from "axios";
import {api} from "../../../../api/axios";
import ErrorPage from "../../auth/ErrorPage";
import Loading from "../../../ui/Loading";
import GameRoutesContainer from "./GameRoutesContainer";
import type {Network} from "../../../../types/network";

export default function PlanningPage() {
  const [network, setNetwork] = useState<Network>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const timeoutHandler = () => {
    alert("timeout");
    navigate("/game/evaluation");
  };

  const fetchNetwork = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/games/network");
      setNetwork(response.data);
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
    fetchNetwork();
  }, []);

  const submit = async () => {
    navigate("/game/execution");
  };

  return loading ? (
    <div className="w-full h-full items-center justify-center flex">
      <Loading />
    </div>
  ) : error || !network ? (
    <ErrorPage error={error} />
  ) : (
    <div className="w-full h-full flex flex-col gap-4 min-h-0">
      <div className="flex w-full items-center gap-8">
        <h2>2. Planning Phase</h2>
        <div className="flex gap-2 items-center">
          <p>Time left:</p>
          <Timer seconds={90} onTimeout={timeoutHandler} />
        </div>
      </div>
      <div className="flex gap-4 justify-between flex-1 w-full min-h-0">
        <div className="flex flex-col justify-between items-center w-2/5">
          <div className="flex flex-col gap-2 text-white w-full">
            <p>
              Starting Station: <b>ToDo</b>
            </p>
            <p>
              Destination Station: <b>ToDo</b>
            </p>
          </div>
          <img
            className="w-full rounded-md"
            src={stationsMap}
            alt="Stations Map"
          />
        </div>
        <div className="flex flex-col gap-2 items-center w-3/5 min-h-0">
          <GameRoutesContainer segments={network.segments} />
        </div>
      </div>
      <button
        className="w-min cursor-pointer min-w-50 text-center bg-blue-800 hover:bg-blue-700 duration-150 text-white p-2 rounded"
        onClick={submit}
      >
        Finish
      </button>
    </div>
  );
}
