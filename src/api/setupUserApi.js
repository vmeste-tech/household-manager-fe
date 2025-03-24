import ApiClient from "../generated-client-js/src/ApiClient";
import { tokenInterceptor } from "./tokenInterceptor";

// Создаем экземпляр ApiClient и задаем базовый URL
const userApiClient = new ApiClient();

// Добавляем наш плагин, чтобы он добавлял заголовок Authorization ко всем запросам
userApiClient.plugins = [tokenInterceptor];

export default userApiClient;
