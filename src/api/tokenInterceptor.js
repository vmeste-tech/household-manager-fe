import DefaultApi from "../generated-client-js/src/api/DefaultApi";
import ApiClient from "../generated-client-js/src/ApiClient";
import RefreshTokenRequest from "../generated-client-js/src/model/RefreshTokenRequest";
import { apiConfig } from "./apiConfig";

let isRefreshing = false;
let failedQueue = [];

/**
 * Обрабатывает очередь запросов, ожидающих обновления токена.
 */
const processQueue = (error, token = null) => {
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
  const token = localStorage.getItem("access_token");
  if (token) {
    req.set("Authorization", `Bearer ${token}`);
  }

  const originalEnd = req.end.bind(req);

  req.end = function (callback) {
    originalEnd(function (err, res) {
      if (err && err.status === 401) {
        if (err.noRefresh || window.location.pathname === "/signin" || localStorage.getItem("is_login_page") === "true") {
          callback(err, res);
          return;
        }

        req._retry = true;
        const refreshToken = localStorage.getItem("refresh_token");

        const retryOriginalRequest = (newToken) => {
          req.set("Authorization", `Bearer ${newToken}`);
          originalEnd(callback);
        };

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((newToken) => {
              retryOriginalRequest(newToken);
            })
            .catch(() => {
              setTimeout(() => {
                window.location.href = "/signin";
              }, 100);
              callback(err, null);
            });
        }

        isRefreshing = true;

        const refreshApiClient = new ApiClient(apiConfig.main.baseUrl);
        const defaultApi = new DefaultApi(refreshApiClient);
        const refreshRequest = new RefreshTokenRequest(refreshToken);

        new Promise((resolve, reject) => {
          defaultApi.refreshToken(refreshRequest, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        })
          .then((data) => {
            const newAccessToken = data.access_token;
            const newRefreshToken = data.refresh_token;
            localStorage.setItem("access_token", newAccessToken);
            localStorage.setItem("refresh_token", newRefreshToken);
            processQueue(null, newAccessToken);
            retryOriginalRequest(newAccessToken);
          })
          .catch(() => {
            processQueue(err, null);
            setTimeout(() => {
              window.location.href = "/signin";
            }, 100);
            callback(err, null);
          })
          .finally(() => {
            isRefreshing = false;
          });
      } else {
        callback(err, res);
      }
    });
  };

  return req;
}
