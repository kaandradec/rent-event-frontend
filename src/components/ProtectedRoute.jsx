import { useAuthStore } from "@/store/auth";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ redirectTo = "/landing" }) => {
  const role = useAuthStore.getState().role;
  console.log("ProtectedRoute", role);
  if (role === null) return <Navigate to={redirectTo} />;
  // if (role === "CLIENTE") return <Navigate to={redirectTo} />;

  return <Outlet />;
};
