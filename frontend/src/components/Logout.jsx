import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Logout() {
  const { logout } = useContext(AuthContext);

  return (
    <div>
            <button onClick={logout}>Logout</button>
    </div>
  );
}
