import React from "react";
import Instructions from "./Instructions";
import {Link} from "react-router";

type Props = {};

export default function ({}: Props) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col gap-4 border max-w-162.5 p-4 overflow-auto h-min rounded-2xl">
        <Link className="hover:underline" to="/login">
          Back
        </Link>
        <Instructions />
      </div>
    </div>
  );
}
