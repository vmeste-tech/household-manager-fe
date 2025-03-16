import api from "./api";

export const login = async (username, password) => {
  const response = await api.post(
    "http://89.169.172.148:8082/api/v1/auth/login",
    {
      username,
      password,
    }
  );
  const { access_token, refresh_token, expires_in, token_type } = response.data;
  // Сохраняем полученные токены в localStorage
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
  localStorage.setItem("expires_in", expires_in);
  localStorage.setItem("token_type", token_type);
  return response.data;
};
