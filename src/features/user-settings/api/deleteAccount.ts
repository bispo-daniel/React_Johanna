import { REACT_QUERY_KEYS } from '@/config';
import { useQuery } from 'react-query';
import { CustomServerError, getAccessToken, validateResponse } from '@/auth-provider';
import { API_URL } from '@/config';

export type DeleteAccountData = {
  id: string;
  password: string;
  passwordConfirmation: string;
}

const deleteAccount = async (data: DeleteAccountData) => {
  const {
    id,
    password,
    passwordConfirmation,
  } = data;

  const accessToken = getAccessToken();

  if (!accessToken) throw new CustomServerError("Missing token to delete account", 400);

  const access = accessToken.replace(/"/g, "");

  const token = `Bearer ${access}`;

  const body = JSON.stringify({
    password,
    confirmaPassword: passwordConfirmation,
  });

  const response = await fetch(`${API_URL}/users/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body
    }
  )

  await validateResponse(response);

  return response.status === 200;
}

export const useDeleteAccountQuery = (enabled: boolean, data: DeleteAccountData) =>
  useQuery({
    queryKey: [REACT_QUERY_KEYS.deleteAccount],
    queryFn: () => deleteAccount(data),
    enabled,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    cacheTime: Infinity,
    staleTime: Infinity
  })
