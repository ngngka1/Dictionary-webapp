import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
  guestAccessible: boolean;
}

const PrivateRoute = ({ children, guestAccessible }: PrivateRouteProps) => {
  const {user, authTokens} = useContext(AuthContext);
  return (
      (user && (guestAccessible || authTokens)) ? children : <Navigate to="/login" />
  );
};

export default PrivateRoute;
