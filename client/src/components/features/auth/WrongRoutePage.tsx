import React from "react";
import {Link} from "react-router";

type Props = {};

export default function WrongRoutePage({}: Props) {
  return (
    <div className="w-full h-full flex flex-col mt-12 items-center">
      <h1>Page not found!</h1>
      <Link className="hover:underline" to="/home">
        Return
      </Link>
    </div>
  );
}
