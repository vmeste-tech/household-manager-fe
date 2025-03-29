import ApiClient from "../generated-client-js/src/ApiClient";
import { tokenInterceptor } from "./tokenInterceptor";
import { apiConfig } from "./apiConfig";

// Создаем экземпляр ApiClient и задаем базовый URL из конфигурации
const clientApiClient = new ApiClient(apiConfig.main.baseUrl);

// Добавляем плагин для авторизации
clientApiClient.plugins = [tokenInterceptor];

export default clientApiClient;
