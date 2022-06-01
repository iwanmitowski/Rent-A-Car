import { Navigate } from "react-router-dom";
import { getUser } from "../../services/auth-service";

export function NonAuthenticatedGuard({ children }) {
  const user = getUser();

  if (user) {
    return <Navigate to="/cars/all" />;
  }

  return children;
}
