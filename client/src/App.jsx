import {useState} from "react";
import {Route, Routes} from "react-router";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/ui/Navbar";

function App() {
  const [isLoggedIn] = useState(true);
  return !isLoggedIn ? (
    <Login />
  ) : (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
