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

export default function Router() {
  //   const isLoggedIn = document.cookie.includes("token=");
  const isLoggedIn = true;

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/instructions" element={<InstructionsPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/home" replace />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route element={<AppLayout />}>
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
