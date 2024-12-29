import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../lib/context/AuthContext";

const PrivateRoutes = () => {
  const savedSession = localStorage.getItem("userSession");
  return savedSession ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
