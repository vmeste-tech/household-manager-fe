import ApiClient from "../generated-penalty-client-js/src/ApiClient";
import { tokenInterceptor } from "./tokenInterceptor";
import { apiConfig } from "./apiConfig";

// Создаем экземпляр ApiClient и задаем базовый URL из конфигурации
const penaltyApiClient = new ApiClient(apiConfig.penalty.baseUrl);

// Добавляем плагин для авторизации
penaltyApiClient.plugins = [tokenInterceptor];

export default penaltyApiClient;
