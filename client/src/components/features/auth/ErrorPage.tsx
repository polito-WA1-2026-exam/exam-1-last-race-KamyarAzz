import errorIcon from "../../../assets/traffic-barrier.png";
import {Link} from "react-router";

type Props = {error?: string | null};

export default function ErrorPage({error}: Props) {
  return (
    <div className="w-full h-full items-center justify-center flex flex-col gap-4">
      <img className="w-40 h-40" src={errorIcon} alt="Error Icon" />
      <p className="text-red-500">{error || "An unexpected error occurred."}</p>
      <Link className="hover:underline" to="/home">
        Home
      </Link>
    </div>
  );
}
