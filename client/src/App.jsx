import {useState} from "react";
import {Route, Routes} from "react-router";
import Login from "./components/auth/Login";
import Home from "./components/features/home/Home";
import Navbar from "./components/ui/Navbar";

function App() {
  const [isLoggedIn] = useState(true);
  return !isLoggedIn ? (
    <Login />
  ) : (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <Navbar />
      <div className="w-full h-full flex px-6 py-4 overflow-auto">
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
