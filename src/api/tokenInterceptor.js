// tokenInterceptor.js

import DefaultApi from "../generated-client-js/src/api/DefaultApi";
import ApiClient from "../generated-client-js/src/ApiClient";
import RefreshTokenRequest from "../generated-client-js/src/model/RefreshTokenRequest";

let isRefreshing = false;
let failedQueue = [];

/**
 * Обрабатывает очередь запросов, ожидающих обновления токена.
 */
const processQueue = (error, token = null) => {
  console.log(
    "processQueue: Начало обработки очереди. Ошибка:",
    error,
    "Новый токен:",
    token
  );
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * Плагин для сгенерированных клиентов. Он:
 * - Добавляет access_token из localStorage в заголовок Authorization каждого запроса.
 * - Если сервер возвращает 401, пытается обновить токен через refreshToken.
 * - При успешном обновлении повторяет исходный запрос с новым токеном.
 * - Если обновление не удалось, перенаправляет пользователя на страницу signin.
 *
 * Использование:
 *   apiClient.plugins = [tokenInterceptor];
 */
export function tokenInterceptor(req) {
  // Извлекаем access_token и устанавливаем заголовок Authorization
  const token = localStorage.getItem("access_token");
  console.log(
    "tokenInterceptor: Извлечен access_token из localStorage:",
    token
  );
  if (token) {
    req.set("Authorization", `Bearer ${token}`);
    console.log(
      "tokenInterceptor: Установлен заголовок Authorization:",
      `Bearer ${token}`
    );
  } else {
    console.log("tokenInterceptor: access_token не найден в localStorage");
  }

  // Сохраняем оригинальный метод end
  const originalEnd = req.end.bind(req);

  req.end = function (callback) {
    console.log("tokenInterceptor: Выполнение запроса (end)");
    originalEnd(function (err, res) {
      // Log the error object in detail
      if (err) {
        console.log("tokenInterceptor: Получена ошибка запроса:", err);
        console.log("tokenInterceptor: err.status =", err.status);
      }

      // Check if error status is 401 and request has not been retried yet
      if (err && err.status === 401) {
        console.log(
          "tokenInterceptor: Статус ошибки 401 и запрос не был повторен. Начинаем процесс обновления токена."
        );
        req._retry = true;
        const refreshToken = localStorage.getItem("refresh_token");
        console.log("tokenInterceptor: Извлечен refresh_token:", refreshToken);

        const retryOriginalRequest = (newToken) => {
          console.log(
            "tokenInterceptor: Повторный запрос с новым токеном:",
            newToken
          );
          req.set("Authorization", `Bearer ${newToken}`);
          originalEnd(callback);
        };

        // Если уже идет процесс обновления, добавляем запрос в очередь
        if (isRefreshing) {
          console.log(
            "tokenInterceptor: Обновление токена уже выполняется. Добавляем запрос в очередь."
          );
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((newToken) => {
              console.log(
                "tokenInterceptor: Получен новый токен из очереди:",
                newToken
              );
              retryOriginalRequest(newToken);
            })
            .catch((refreshError) => {
              console.error(
                "tokenInterceptor: Ошибка обновления токена из очереди:",
                refreshError
              );
              window.location.href = "/signin";
              callback(refreshError, null);
            });
        }

        isRefreshing = true;
        console.log(
          "tokenInterceptor: Инициируем процесс обновления токена через refreshToken API."
        );

        // Создаем новый экземпляр ApiClient без плагинов, чтобы избежать рекурсии
        const refreshApiClient = new ApiClient();
        const defaultApi = new DefaultApi(refreshApiClient);
        const refreshRequest = new RefreshTokenRequest(refreshToken);

        new Promise((resolve, reject) => {
          console.log(
            "tokenInterceptor: Вызываем refreshToken API с данными:",
            refreshRequest
          );
          defaultApi.refreshToken(refreshRequest, (err, data) => {
            if (err) {
              console.error(
                "tokenInterceptor: refreshToken API вернул ошибку:",
                err
              );
              reject(err);
            } else {
              console.log(
                "tokenInterceptor: refreshToken API вернул данные:",
                data
              );
              resolve(data);
            }
          });
        })
          .then((data) => {
            const newAccessToken = data.access_token;
            const newRefreshToken = data.refresh_token;
            console.log(
              "tokenInterceptor: Получены новые токены. Новый access_token:",
              newAccessToken,
              "Новый refresh_token:",
              newRefreshToken
            );
            localStorage.setItem("access_token", newAccessToken);
            localStorage.setItem("refresh_token", newRefreshToken);
            processQueue(null, newAccessToken);
            retryOriginalRequest(newAccessToken);
          })
          .catch((err) => {
            console.error("tokenInterceptor: Не удалось обновить токен:", err);
            processQueue(err, null);
            window.location.href = "/signin";
            callback(err, null);
          })
          .finally(() => {
            console.log(
              "tokenInterceptor: Процесс обновления токена завершен."
            );
            isRefreshing = false;
          });
      } else {
        console.log(
          "tokenInterceptor: Ошибка не является 401 или запрос уже был повторен. Передаем результат обратно."
        );
        callback(err, res);
      }
    });
  };

  return req;
}
