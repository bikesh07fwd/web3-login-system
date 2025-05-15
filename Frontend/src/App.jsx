import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <Login />
      </div>
    </>
  );
}

export default App;
