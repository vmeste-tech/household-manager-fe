import ApiClient from "../generated-task-client-js/src/ApiClient";
import { tokenInterceptor } from "./tokenInterceptor";
import { apiConfig } from "./apiConfig";

// Создаем экземпляр ApiClient и задаем базовый URL из конфигурации
const taskApiClient = new ApiClient(apiConfig.task.baseUrl);

// Добавляем плагин для авторизации
taskApiClient.plugins = [tokenInterceptor];

export default taskApiClient;
