import React, {
  createContext,
  useContext,
  useMemo,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useTokenStorage } from "@/hooks/useTokenStorage";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { SUPER_USER, COMMOM_USER, API_URL } from "@/config";
import { useNavigate } from "react-router-dom";

export class CustomServerError extends Error {
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

type AccessTokenType = JwtPayload & {
  id: string;
  username: string;
  role: typeof SUPER_USER | typeof COMMOM_USER;
};

type RefreshTokenType = JwtPayload & {
  id: string;
  role: typeof SUPER_USER | typeof COMMOM_USER;
};

interface AuthContextType {
  user: AccessTokenType | null;
  logout: () => void;
  saveTokens: (accessToken: string, refreshToken: string) => void;
  isAdmin: boolean;
  isAccessTokenExpired: boolean;
  refreshAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const decodeAccessToken = (token: string): AccessTokenType | null => {
  try {
    return jwtDecode<AccessTokenType>(token);
  } catch (error) {
    console.error("Failed to decode access token:", error);
    localStorage.removeItem("access_token");
    return null;
  }
};

const decodeRefreshToken = (token: string): RefreshTokenType | null => {
  try {
    return jwtDecode<RefreshTokenType>(token);
  } catch (error) {
    console.error("Failed to decode refresh token:", error);
    localStorage.removeItem("refresh_token");
    return null;
  }
};

type RefreshTokenResponse = {
  accessToken: string;
};

const refreshTokenReq = async (refreshToken: string) => {
  const bodyWithRefreshToken = JSON.stringify({
    refreshToken,
  });

  try {
    const response = await fetch(`${API_URL}/refresh`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: bodyWithRefreshToken,
    });

    await validateResponse(response);

    const responseBody: RefreshTokenResponse = await response.json();

    const { accessToken } = responseBody;

    return accessToken;
  } catch (error) {
    console.error(`Error trying to refresh token. Reason: ${error}`);

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    return null;
  }
};

export const getAccessToken = () => localStorage.getItem("access_token");

export const isAccessTokenExpiredSync = () => {
  const accessToken = getAccessToken();

  if (!accessToken) return true;

  const accessTokenDecoded = decodeAccessToken(accessToken);

  const isExpired = accessTokenDecoded?.exp
    ? Date.now() > accessTokenDecoded.exp * 1000
    : true;

  return isExpired;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const {
    accessToken,
    refreshToken,
    clearTokens,
    saveTokens,
    saveAccessToken,
  } = useTokenStorage();

  const navigate = useNavigate();

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (accessToken) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [accessToken]);

  const user = useMemo(() => {
    return isLogged && accessToken ? decodeAccessToken(accessToken) : null;
  }, [accessToken, isLogged]);

  const isAdmin = user !== null && user.role === SUPER_USER;

  const logout = () => {
    setIsLogged(false);
    clearTokens();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  const isAccessTokenExpired = user?.exp ? Date.now() > user.exp * 1000 : true;

  const refreshTokenDecoded = refreshToken
    ? decodeRefreshToken(refreshToken)
    : null;

  const isRefreshTokenExpired = refreshTokenDecoded?.exp
    ? Date.now() > refreshTokenDecoded.exp * 1000
    : true;

  const refreshAccessToken = async () => {
    if (!refreshToken || isRefreshTokenExpired) {
      clearTokens();
      return;
    }

    const newAccessToken = await refreshTokenReq(refreshToken);

    if (newAccessToken === null) {
      clearTokens();
      return;
    }

    saveAccessToken(newAccessToken);
  };

  const value = useMemo(
    () => ({
      user,
      logout,
      saveTokens,
      isAdmin,
      isAccessTokenExpired,
      refreshAccessToken,
    }),
    [user, isLogged]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  return context;
};
