import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AdminLogginedRoutes = () => {
  const admin = useSelector((state) => state.admin.admin);
  return !admin ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AdminLogginedRoutes;
