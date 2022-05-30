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
import { CarForm } from "./components/cars/car-form/CarForm";
import { UserForm } from "./components/users/user-form/UserForm";
import { UsersList } from "./components/users/users-list/UsersList";
import { RentForm } from "./components/rent/rent-form/RentForm";
import { AdminGuard } from "./utils/guards/AdminGuard";

function App() {
  const [isLogged, setIsLogged] = useState(!!getUser());

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Layout isLogged={isLogged} setIsLogged={setIsLogged}/>}>
          <Route path="/" element={<Home />} />
          <Route path="/cars/all" element={<CarsList />}/>
          <Route path="/cars/mine/:id" element={<AuthenticatedGuard><CarsList areMine/></AuthenticatedGuard>}/>
          <Route path="/cars/rent/:id" element={<AuthenticatedGuard><CarsList areMine={false}/></AuthenticatedGuard>}/>
          <Route path="/cars/create" element={<AuthenticatedGuard><CarForm /></AuthenticatedGuard>} />
          <Route path="/car/edit/:id" element={<AuthenticatedGuard><CarForm /></AuthenticatedGuard>} />
          <Route path="/car/:id" element={<AuthenticatedGuard><CarsList isDetails/></AuthenticatedGuard>} />
          <Route path="/rent/:id" element={<AuthenticatedGuard><RentForm/></AuthenticatedGuard>} />
          <Route path="/user/:id" element={<AuthenticatedGuard><UserForm /></AuthenticatedGuard>} />
          <Route path="/users" element={<AdminGuard><UsersList /></AdminGuard>} />
          <Route path="/user/rentals/:id" element={<CarsList areRented/>} />
          <Route exact path="/login" element={<NonAuthenticatedGuard><Login setIsLogged={setIsLogged}/></NonAuthenticatedGuard>} />
          <Route exact path="/register" element={<NonAuthenticatedGuard><Register setIsLogged={setIsLogged}/></NonAuthenticatedGuard>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
