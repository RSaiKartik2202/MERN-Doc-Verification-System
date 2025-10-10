import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-body">
      <div className="home-container">
        <h1 className="title">Welcome to the Document Verification System</h1>
        <nav className="nav-links">
          <Link to="/register" className="link">Register</Link>
          <Link to="/login" className="link">Login</Link>
        </nav>
      </div>
    </div>
  );
}
