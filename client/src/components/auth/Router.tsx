import {Navigate, Route, Routes} from "react-router";
import Login from "./Login";
import Home from "../features/home/Home";
import SetupPhase from "../features/game/SetupPhase";
import PlanningPhase from "../features/game/PlanningPhase";
import AppLayout from "../ui/AppLayout";
import InstructionsPage from "../features/instructions/InstructionsPage";
import WrongRoutePage from "./WrongRoutePage";

type Props = {};

export default function Router({}: Props) {
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
      <Route element={<AppLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/game/setup" element={<SetupPhase />} />
        <Route path="/game/planning" element={<PlanningPhase />} />
        <Route path="/game/evaluation" element={<PlanningPhase />} />
        <Route path="*" element={<WrongRoutePage />} />
      </Route>
    </Routes>
  );
}
