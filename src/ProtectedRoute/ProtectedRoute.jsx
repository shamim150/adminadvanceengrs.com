import { jwtDecode } from "jwt-decode";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const token = localStorage.getItem("token");

  if (token) {
    const user = jwtDecode(token);
    console.log(user)
    if (user?.email) {
      return <div>{children}</div>;
    } else {
      return <Navigate to="/login" replace state={{ from: location }} />;
    }
  }

  return <Navigate to="/login" replace state={{ from: location }} />;
};

export default ProtectedRoute;
