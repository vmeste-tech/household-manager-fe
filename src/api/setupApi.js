// setupApi.js
import ApiClient from "../generated-client-js/src/ApiClient";
import { tokenInterceptor } from "./tokenInterceptor";

// Создаем экземпляр ApiClient и задаем базовый URL
const apiClient = new ApiClient();

// Добавляем наш плагин, чтобы он добавлял заголовок Authorization ко всем запросам
apiClient.plugins = [tokenInterceptor];

export default apiClient;
