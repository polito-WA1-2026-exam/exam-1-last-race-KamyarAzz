import React from "react";
import Loading from "../../ui/Loading";
import Leaderboard from "../leaderboard/Leaderboard";
import Instructions from "../instructions/Instructions";

type Props = {};

export default function Home({}: Props) {
  return (
    <div className="w-full h-full flex justify-between">
      <Instructions />
      <Leaderboard />
    </div>
  );
}
