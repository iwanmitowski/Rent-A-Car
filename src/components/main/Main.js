import { Outlet } from "react-router-dom";
import "./Main.css";

export default function Main() {
  return (
    <div className="main-content">
      <Outlet />
    </div>
  );
}
