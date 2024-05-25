import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useTokenStorage } from "@/hooks/useTokenStorage";
import { jwtDecode } from "jwt-decode";
import { SUPER_USER, COMMOM_USER } from "@/config";

class CustomServerError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "CustomServerError";
  }
}

export const validateResponse = async (response: Response) => {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new CustomServerError(errorMessage, response.status);
  }
};

interface AccessTokenType {
  sub: string;
  id: string;
  aud: string;
  iss: string;
  iat: Date;
  exp: Date;
  role: typeof SUPER_USER | typeof COMMOM_USER;
}

interface AuthContextType {
  user: AccessTokenType | null;
  logout: () => void;
  saveTokens: (accessToken: string, refreshToken: string) => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { accessToken, clearTokens, saveTokens } = useTokenStorage();
  const navigate = useNavigate();

  const decodeToken = (token: string): AccessTokenType | null => {
    try {
      return jwtDecode<AccessTokenType>(token);
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };

  const user = useMemo(() => {
    return accessToken ? decodeToken(accessToken) : null;
  }, [accessToken]);

  const isAdmin = user !== null && user.role === SUPER_USER;

  const logout = () => {
    clearTokens();
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      logout,
      saveTokens,
      isAdmin,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  return context;
};
