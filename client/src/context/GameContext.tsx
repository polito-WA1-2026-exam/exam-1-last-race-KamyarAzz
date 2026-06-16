import {createContext, useContext, useState, type ReactNode} from "react";
import type {GameEvent, Segment} from "../types/network";

type GameState = {
  selectedSegments: Segment[];
  events: GameEvent[];
  baseCoin: number;
  finalCoins: number;
  reason: string;
};

type GameContextValue = GameState & {
  setGameState: (state: Partial<GameState>) => void;
  resetGameState: () => void;
};

const initialState: GameState = {
  selectedSegments: [],
  events: [],
  baseCoin: 0,
  finalCoins: 0,
  reason: "",
};

const GameContext = createContext<GameContextValue | undefined>(undefined);

export function GameProvider({children}: {children: ReactNode}) {
  const [gameState, setGameStateInternal] = useState<GameState>(initialState);

  const setGameState = (state: Partial<GameState>) => {
    setGameStateInternal((current) => ({...current, ...state}));
  };

  const resetGameState = () => setGameStateInternal(initialState);

  return (
    <GameContext.Provider
      value={{
        ...gameState,
        setGameState,
        resetGameState,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}
