import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles: role }) {
  const { token, user } = useContext(AuthContext);

  if (!token) return <Navigate to="/" replace />;
  
  if (role && !role.includes(user?.role)) {
    return <h2>Access Denied: You don’t have permission</h2>;
  }

  return children;
}
