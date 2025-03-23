export async function registerUser(userData) {
  const response = await fetch("http://localhost:8082/api/v1/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Ошибка регистрации");
  }

  return response.json();
}

import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

// Создаем экземпляр axios с базовым URL
const api = axios.create({
  baseURL: "/api/v1",
});

// Перехватчик запросов для добавления access token в заголовок
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Логика обновления токена при получении ошибки 401
const refreshAuthLogic = (failedRequest) => {
  const refreshToken = localStorage.getItem("refresh_token");
  return axios
    .post("http://localhost:8082/api/v1/auth/refresh", {
      refresh_token: refreshToken,
    })
    .then((response) => {
      const { access_token, refresh_token, expires_in, token_type } =
        response.data;
      // Сохраняем новые токены
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("expires_in", expires_in);
      localStorage.setItem("token_type", token_type);

      // Обновляем заголовок запроса, который повторяется
      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + access_token;
      return Promise.resolve();
    })
    .catch((error) => {
      console.error("Ошибка обновления токена:", error);
      // Если обновление не удалось, можно выполнить логаут или перенаправить на страницу логина
      localStorage.clear();
      window.location.href = "/login";
      return Promise.reject(error);
    });
};

// Подключаем интерцептор обновления токена
createAuthRefreshInterceptor(api, refreshAuthLogic);

export default api;
