import { Navigate, Outlet } from "react-router";

export default function MainRoutesProtected({ uid, url }) {
  return uid ? <Outlet /> : <Navigate to={url} />;
}
