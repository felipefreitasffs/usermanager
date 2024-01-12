import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute() {
  const { auth } = useContext(AuthContext);

  return !auth ? <Navigate to="/login" /> : <Outlet />
}