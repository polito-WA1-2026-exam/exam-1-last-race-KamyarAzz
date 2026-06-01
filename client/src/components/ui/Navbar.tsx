import React from "react";
import {Link} from "react-router";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="px-6 py-4 border-b">
      <Link className="text-2xl font-bold text-white" to="/home">
        Last Run
      </Link>
    </nav>
  );
}
