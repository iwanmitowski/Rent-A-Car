import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/home/Home";
import { Login } from "./components/auth/login/Login";
import { Register } from "./components/auth/register/Register";
import { NonAuthenticatedGuard } from "./utils/guards/NonAuthenticatedGuard";
import { AuthenticatedGuard } from "./utils/guards/AuthenticatedGuard";
import { useState } from "react";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Layout isLogged={isLogged} />}>
          <Route path="/" element={<Home />} />
          <Route exact path="/login" element={<NonAuthenticatedGuard><Login setIsLogged={setIsLogged}/></NonAuthenticatedGuard>} />
          <Route exact path="/register" element={<NonAuthenticatedGuard><Register setIsLogged={setIsLogged}/></NonAuthenticatedGuard>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
