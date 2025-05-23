import ApiClient from "../generated-finance-client-js/src/ApiClient";
import { tokenInterceptor } from "./tokenInterceptor";
import { apiConfig } from "./apiConfig";

// Создаем экземпляр ApiClient и задаем базовый URL из конфигурации
const financeApiClient = new ApiClient(apiConfig.finance.baseUrl);

// Добавляем плагин для авторизации
financeApiClient.plugins = [tokenInterceptor];

export default financeApiClient;
