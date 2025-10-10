import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import InstituteUpload from "./pages/InstituteUpload";
import CompanyVerify from "./pages/CompanyVerify";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/institute/upload"
          element={
            <ProtectedRoute allowedRoles={['Institution']}>
              <InstituteUpload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/verify"
          element={
            <ProtectedRoute allowedRoles={['Company']}>
              <CompanyVerify />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
