import { API_URL, REACT_QUERY_KEYS } from "@/config";
import { validateResponse } from "@/auth-provider";
import { useQuery } from "react-query";

export type AuthType = {
  email: string,
  password: string
}

type Tokens = {
  accessToken: string;
  refreshToken: string;
}

const authenticate = async (userAuth: AuthType) => {
  const auth = JSON.stringify(userAuth);

  const response = await fetch(`${API_URL}/auth`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: auth
  })

  await validateResponse(response);

  const tokens: Tokens = await response.json();

  return tokens;
}

export const useAuthentication = (enabled: boolean, auth: AuthType) =>
  useQuery({
    queryKey: [REACT_QUERY_KEYS.auth],
    queryFn: () => authenticate(auth),
    enabled,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    cacheTime: Infinity,
    staleTime: Infinity
  });
