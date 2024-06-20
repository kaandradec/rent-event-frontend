import { useAuthStore } from "@/store/auth";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ redirectTo = "/landing" }) => {
  const rol = useAuthStore.getState().rol;
  console.log("ProtectedRoute", rol);
  if (rol === null) return <Navigate to={redirectTo} />;
  if (rol === "CLIENTE") return <Navigate to={redirectTo} />;

  return <Outlet />;
};
