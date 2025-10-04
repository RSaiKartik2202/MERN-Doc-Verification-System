import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import InstituteUpload from "./pages/InstituteUpload";
import CompanyVerify from "./pages/CompanyVerify";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
        />
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
