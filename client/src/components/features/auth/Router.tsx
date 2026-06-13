import {Navigate, Route, Routes} from "react-router";
import Login from "./Login";
import Home from "../home/Home";
import SetupPage from "../game/setup-phase/SetupPage";
import PlanningPage from "../game/planning-phase/PlanningPage";
import AppLayout from "../../ui/AppLayout";
import InstructionsPage from "../instructions/InstructionsPage";
import WrongRoutePage from "./WrongRoutePage";
import ExecutionPage from "../game/execution-phase/ExecutionPage";
import ResultPage from "../game/result-phase/ResultPage";
import {useEffect, useState} from "react";
import {checkSession} from "../../../api/auth";
import Loading from "../../ui/Loading";

export default function Router() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const checkUserSession = async () => {
    setLoading(true);
    try {
      const user = await checkSession();
      if (!user) {
        setIsLoggedIn(false);
        return;
      }
      setIsLoggedIn(true);
    } catch (err) {
      console.log(err);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserSession();
  }, []);

  return loading ? (
    <div className="w-full h-full flex justify-center items-center">
      <Loading />
    </div>
  ) : !isLoggedIn ? (
    <Routes>
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/instructions" element={<InstructionsPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/login" element={<Navigate to="/home" replace />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route element={<AppLayout setIsLoggedIn={setIsLoggedIn} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/game/setup" element={<SetupPage />} />
        <Route path="/game/planning" element={<PlanningPage />} />
        <Route path="/game/execution" element={<ExecutionPage />} />
        <Route path="/game/result" element={<ResultPage />} />
        <Route path="*" element={<WrongRoutePage />} />
      </Route>
    </Routes>
  );
}
