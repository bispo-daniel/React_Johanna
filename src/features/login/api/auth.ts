import { API_URL, QUERY_KEYS } from "@/config";
import { responseOk } from "@/auth-provider";
import { useQuery } from "react-query";
import { AuthType } from "../types";

const authenticate = async (userAuth: AuthType) => {
  const auth = JSON.stringify(userAuth);

  const response = await fetch(`${API_URL}/auth`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: auth
  })

  await responseOk(response);

  return response.status === 200;
}

export const useAuthentication = (enabled: boolean, auth: AuthType) =>
  useQuery({
    queryKey: [QUERY_KEYS.auth], queryFn: () => authenticate(auth,),
    enabled,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    cacheTime: Infinity,
    staleTime: Infinity
  });
