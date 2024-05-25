import { useLocalStorage } from "./useLocalStorage";

export const useTokenStorage = () => {
  const [accessToken, setAccessToken] = useLocalStorage<string | null>("access_token", null);
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>("refresh_token", null);

  const saveTokens = (newAccessToken: string, newRefreshToken: string) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
  };

  const saveAccessToken = (newAccessToken: string) => setAccessToken(newAccessToken);

  const clearTokens = () => {
    setAccessToken(null);
    setRefreshToken(null);
  };

  const clearAccessToken = () => setAccessToken(null);
  const clearRefreshToken = () => setRefreshToken(null);

  return { accessToken, refreshToken, saveTokens, saveAccessToken, clearTokens, clearAccessToken, clearRefreshToken };
};
