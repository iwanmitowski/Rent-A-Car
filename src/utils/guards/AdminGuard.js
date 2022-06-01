import { Navigate } from "react-router-dom";
import { getUser } from "../../services/auth-service";

export function AdminGuard({ children }) {
  const user = getUser();

  if (user && !user.isAdmin) {
    return <Navigate to="/cars/all" />;
  }

  return children;
}
