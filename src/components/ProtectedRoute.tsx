import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, isAccessTokenExpiredSync } from "@/auth-provider";
import Spinner from "./Spinner";

interface ProtectedRouteProps {
  element: React.ReactElement;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  adminOnly = false,
}) => {
  const { user, isAdmin, isAccessTokenExpired, refreshAccessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const isExpired = isAccessTokenExpiredSync();

    const checkToken = async () => {
      if (isAccessTokenExpired || isExpired) {
        await refreshAccessToken();
      }
      setIsLoading(false);
    };

    checkToken();
  }, [isAccessTokenExpired, refreshAccessToken, pathname]);

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
