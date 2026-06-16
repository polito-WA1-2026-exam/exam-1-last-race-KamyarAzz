import Router from "./components/features/auth/Router";
import {GameProvider} from "./context/GameContext";

function App() {
  return (
    <GameProvider>
      <Router />
    </GameProvider>
  );
}

export default App;
