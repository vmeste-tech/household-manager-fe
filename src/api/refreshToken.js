// refreshToken.js

import DefaultApi from "../generated-client-js/src/api/DefaultApi";
import ApiClient from "../generated-client-js/src/ApiClient";

export function refreshAccessToken(callback) {
  const storedRefreshToken = localStorage.getItem("refresh_token");
  if (!storedRefreshToken) {
    return callback(new Error("Нет refresh токена"));
  }

  // Создаем новый экземпляр ApiClient для запроса обновления токена
  const apiClient = new ApiClient();
  const defaultApi = new DefaultApi(apiClient);

  // Вызываем эндпоинт обновления токена
  defaultApi.refreshToken(
    { refresh_token: storedRefreshToken },
    (error, data) => {
      if (error) {
        return callback(error);
      } else {
        // Сохраняем новые токены
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        // Обновляем функцию, возвращающую токен в глобальном экземпляре клиента
        ApiClient.instance.authentications["bearer"].accessToken = () =>
          localStorage.getItem("access_token");
        return callback(null, data.access_token);
      }
    }
  );
}
