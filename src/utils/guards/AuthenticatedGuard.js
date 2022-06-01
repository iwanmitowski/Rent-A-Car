import { Navigate } from "react-router-dom";
import { getUser } from "../../services/auth-service";

export function AuthenticatedGuard({ children }) {
  const user = getUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
