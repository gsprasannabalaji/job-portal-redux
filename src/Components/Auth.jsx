import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Login from '../pages/Login';

const Auth = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const location = useLocation();
  const currentPathname = location.pathname;

  return isAuthenticated ? (
    currentPathname !== "/" ? (
      children
    ) : (
      <Navigate to="/home" replace />
    )
  ) : (
    currentPathname === "/" ? (
      <Login /> 
    ) : (
      <Navigate to="/" replace /> 
    )
  );
};

export default Auth;
