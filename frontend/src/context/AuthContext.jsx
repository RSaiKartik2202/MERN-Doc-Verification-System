import { createContext, useState, useEffect} from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
    });

    const [token, setToken] = useState(localStorage.getItem("token"));

    const login = (userData, jwt) => {
        localStorage.setItem("token", jwt);
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(jwt);
        setUser(userData);
        // navigate("/dashboard");
        if (userData.role === "Institution") {
            navigate("/institute/upload");
        } else if (userData.role === "Company") {
            navigate("/company/verify");
        } else if (userData.role === "User") {
            navigate("/dashboard"); // optional for student role
        } else {
            navigate("/"); // fallback
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        navigate("/");
    };

    useEffect(() => {
        if (!token) return;

        const { exp } = jwtDecode(token); // expiry in seconds
        const expiryTime = exp * 1000 - Date.now(); // milliseconds until expiry

        if (expiryTime <= 0) {
            logout();
            return;
        }

        const timeout = setTimeout(() => {
            logout();
        }, expiryTime);

        return () => clearTimeout(timeout);
    }, [token]);

    return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
        {children}
    </AuthContext.Provider>
    );
}
