import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/home/Home";
import { Login } from "./components/auth/login/Login";
import { Register } from "./components/auth/register/Register";
import { NonAuthenticatedGuard } from "./utils/guards/NonAuthenticatedGuard";
import { AuthenticatedGuard } from "./utils/guards/AuthenticatedGuard";
import { useState } from "react";
import { CarsList } from "./components/cars/cars-list/CarsList";
import { getUser } from "./services/auth-service";

function App() {
  const [isLogged, setIsLogged] = useState(!!getUser());

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Layout isLogged={isLogged} />}>
          <Route path="/" element={<Home />} />
          <Route path="/cars/all" element={<CarsList/>}/>
          <Route path="/cars/mine/:id" element={<CarsList areMine/>}/>
          <Route path="/cars/rent/:id" element={<CarsList areMine={false}/>}/>
          <Route exact path="/login" element={<NonAuthenticatedGuard><Login setIsLogged={setIsLogged}/></NonAuthenticatedGuard>} />
          <Route exact path="/register" element={<NonAuthenticatedGuard><Register setIsLogged={setIsLogged}/></NonAuthenticatedGuard>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
