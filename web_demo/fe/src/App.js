import { ToastContainer } from "react-toastify";
import "./App.css";
import Home from "./components/Home";
import LoginPage from "./components/Login";
import { useEffect, useState } from "react";

function App() {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    console.log(login);
  }, [login]);
  return (
    <>
      {login ? <Home setLogin={setLogin} /> : <LoginPage setLogin={setLogin} />}
      <ToastContainer />
    </>
  );
}

export default App;
