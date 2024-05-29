import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/auth-provider";
import Spinner from "./Spinner";

interface ProtectedRouteProps {
  element: React.ReactElement;
  adminOnly?: boolean;
}

type Locations = "/" | "/info" | "/chat" | "/users" | "/login" | "/signIn";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  adminOnly = false,
}) => {
  const { user, isAdmin, isAccessTokenExpired, refreshAccessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const pathname = location.pathname as Locations;

  const navigatedToProtectedRoute =
    pathname === "/chat" || pathname === "/users";

  useEffect(() => {
    const checkToken = async () => {
      if (isAccessTokenExpired) {
        await refreshAccessToken();
      }
      setIsLoading(false);
    };

    checkToken();
  }, [isAccessTokenExpired, refreshAccessToken, navigatedToProtectedRoute]);

  if (isLoading) {
    return <Spinner size="10" />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
