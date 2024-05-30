import { REACT_QUERY_KEYS } from '@/config';
import { useQuery } from 'react-query';
import { validateResponse } from '@/auth-provider';
import { API_URL } from '@/config';

export type CreateUserType = {
  email: string,
  password: string,
  username: string,
  telephone: string,
  dataDeNascimento: string
}

const createUser = async (userData: CreateUserType) => {
  const user = JSON.stringify(userData);

  const response = await fetch(`${API_URL}/users`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: user
    }
  )

  await validateResponse(response);

  return response.status === 200;
}

export const useCreateUserQuery = (enabled: boolean, userData: CreateUserType) =>
  useQuery({
    queryKey: [REACT_QUERY_KEYS.createUser],
    queryFn: () => createUser(userData),
    enabled,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    cacheTime: Infinity,
    staleTime: Infinity
  })
