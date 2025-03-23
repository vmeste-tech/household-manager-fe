import ApiClient from "../generated-task-client-js/src/ApiClient";
import { tokenInterceptor } from "./tokenInterceptor";

// Создаем экземпляр ApiClient и задаем базовый URL
const tasksApiClient = new ApiClient();

// Добавляем наш плагин, чтобы он добавлял заголовок Authorization ко всем запросам
tasksApiClient.plugins = [tokenInterceptor];

export default tasksApiClient;
