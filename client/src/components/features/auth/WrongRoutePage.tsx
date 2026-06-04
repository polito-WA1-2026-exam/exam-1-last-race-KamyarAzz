import {Link} from "react-router";

export default function WrongRoutePage() {
  return (
    <div className="w-full h-full flex flex-col mt-12 items-center">
      <h1>Page not found!</h1>
      <Link className="hover:underline" to="/home">
        Return
      </Link>
    </div>
  );
}
