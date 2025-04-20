import { tokenInterceptor } from "./tokenInterceptor";
import { apiConfig } from "./apiConfig";
import ApiClient from "../generated-notif-client-js/src/ApiClient";

// Создаем экземпляр ApiClient и задаем базовый URL из конфигурации
const notifApiClient = new ApiClient(apiConfig.notification.baseUrl);

// Добавляем плагин для авторизации
notifApiClient.plugins = [tokenInterceptor];

export default notifApiClient;