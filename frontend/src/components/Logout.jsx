import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Logout.css";

export default function Logout() {
  const { logout } = useContext(AuthContext);

  return (
    <div>
          <button onClick={logout} className="logout-btn">Logout</button>
    </div>
  );
}
