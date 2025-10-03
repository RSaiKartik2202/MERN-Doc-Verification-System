import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>Your role: {user?.role}</p>
      {user?.role === "institute" && <button>Upload Marksheet</button>}
      {user?.role === "company" && <button>Verify Student Docs</button>}
      {user?.role === "student" && <button>View My Certificates</button>}
      <br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}
