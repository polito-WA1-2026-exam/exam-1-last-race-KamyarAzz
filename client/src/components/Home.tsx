import React from "react";
import Loading from "./ui/Loading";
import Leaderboard from "./Leaderboard";

type Props = {};

export default function Home({}: Props) {
  return (
    <div className="w-full h-full flex justify-between px-6 py-4">
      <div>start game</div>
      <Leaderboard />
    </div>
  );
}
