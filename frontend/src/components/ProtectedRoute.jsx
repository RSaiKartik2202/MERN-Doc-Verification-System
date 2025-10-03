import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { token, user } = useContext(AuthContext);

  if (!token) return <Navigate to="/login" replace />;
  
  if (role && user.role !== role) {
    return <h2>Access Denied: You don’t have permission</h2>;
  }

  return children;
}
