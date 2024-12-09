import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const token = localStorage.getItem("token");

  if (token) {
    return <div>{children}</div>;
  }

  return <Navigate to="/login" replace state={{ from: location }} />;
};

export default ProtectedRoute;
