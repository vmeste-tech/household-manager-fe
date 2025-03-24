import ApiClient from "../generated-penalty-client-js/src/ApiClient";
import { tokenInterceptor } from "./tokenInterceptor";

// Создаем экземпляр ApiClient и задаем базовый URL
const penaltyApiClient = new ApiClient();

// Добавляем наш плагин, чтобы он добавлял заголовок Authorization ко всем запросам
penaltyApiClient.plugins = [tokenInterceptor];

export default penaltyApiClient;
