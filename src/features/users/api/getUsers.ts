import { CustomServerError, getAccessToken, validateResponse } from "@/auth-provider";
import { API_URL, REACT_QUERY_KEYS } from "@/config";
import { useQuery } from "react-query";

export type User = {
  id: number;
  username: string;
  email: string;
  role: "ADMIN" | "ALUNO";
  status: "ACTIVE" | "INACTIVE";
  // age: number;
  // telephone: string;
};

const getUsers = async () => {
  const accessToken = getAccessToken();

  if (!accessToken) throw new CustomServerError("Missing token to fetch users", 400);

  const access = accessToken.replace(/"/g, "");

  const token = `Bearer ${access}`;

  const response = await fetch(`${API_URL}/users`, {
    headers: {
      "Authorization": token
    }
  });

  await validateResponse(response);

  const users: User[] = await response.json();

  return users;
}

export const useUsersQuery = () =>
  useQuery({
    queryKey: [REACT_QUERY_KEYS.users],
    queryFn: () => getUsers(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    cacheTime: Infinity,
    staleTime: Infinity
  })