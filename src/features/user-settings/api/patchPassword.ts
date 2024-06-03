import { REACT_QUERY_KEYS } from '@/config';
import { useQuery } from 'react-query';
import { CustomServerError, getAccessToken, validateResponse } from '@/auth-provider';
import { API_URL } from '@/config';

export type ChangePasswordData = {
  id: string;
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

const changePassword = async (data: ChangePasswordData) => {
  const {
    id,
    currentPassword,
    newPassword,
    newPasswordConfirmation
  } = data;

  const accessToken = getAccessToken();

  if (!accessToken) throw new CustomServerError("Missing token to patch password", 400);

  const access = accessToken.replace(/"/g, "");

  const token = `Bearer ${access}`;

  const body = JSON.stringify({
    "senhaAtual": currentPassword,
    "novaSenha": newPassword,
    "confirmaSenha": newPasswordConfirmation
  });

  const response = await fetch(`${API_URL}/users/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body
    }
  )

  await validateResponse(response);

  return response.status === 204;
}

export const usePatchPasswordQuery = (enabled: boolean, data: ChangePasswordData) =>
  useQuery({
    queryKey: [REACT_QUERY_KEYS.changePassword],
    queryFn: () => changePassword(data),
    enabled,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    cacheTime: Infinity,
    staleTime: Infinity
  })
