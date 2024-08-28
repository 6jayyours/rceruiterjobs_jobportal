import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

const ProtectedRoute = ({ children, requiredRole }) => {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const userRole = useSelector((state) => state.auth.role);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/noauthorization" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
