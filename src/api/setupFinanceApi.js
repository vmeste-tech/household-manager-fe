import ApiClient from "../generated-finance-client-js/src/ApiClient";
import { tokenInterceptor } from "./tokenInterceptor";

// Создаем экземпляр ApiClient и задаем базовый URL
const financeApiClient = new ApiClient();

// Добавляем наш плагин, чтобы он добавлял заголовок Authorization ко всем запросам
financeApiClient.plugins = [tokenInterceptor];

export default financeApiClient;
