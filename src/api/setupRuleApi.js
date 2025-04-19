import { tokenInterceptor } from "./tokenInterceptor";
import { apiConfig } from "./apiConfig";
import ApiClient from "../generated-rules-client-js/src/ApiClient";

// Создаем экземпляр ApiClient и задаем базовый URL из конфигурации
const ruleApiClient = new ApiClient(apiConfig.rule.baseUrl);

// Добавляем плагин для авторизации
ruleApiClient.plugins = [tokenInterceptor];

export default ruleApiClient;
