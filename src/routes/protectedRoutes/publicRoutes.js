import { Navigate, Outlet } from "react-router";

export default function PublicRoutes({ uid , url}) {
  return !uid ? <Outlet /> : <Navigate to={url} />;
}
