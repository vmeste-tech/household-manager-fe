import clientApiClient from "./setupClientApi";
import financeApiClient from "./setupFinanceApi";
import taskApiClient from "./setupTaskApi";
import penaltyApiClient from "./setupPenaltyApi";

// Импорт API клиентов из сгенерированных файлов
import ClientDefaultApi from "../generated-client-js/src/api/DefaultApi";
import FinanceDefaultApi from "../generated-finance-client-js/src/api/DefaultApi";
import TaskDefaultApi from "../generated-task-client-js/src/api/DefaultApi";
import PenaltyDefaultApi from "../generated-penalty-client-js/src/api/DefaultApi";

// Создаем экземпляры API с настроенными клиентами
export const userApi = new ClientDefaultApi(clientApiClient);
export const financeApi = new FinanceDefaultApi(financeApiClient);
export const taskApi = new TaskDefaultApi(taskApiClient);
export const penaltyApi = new PenaltyDefaultApi(penaltyApiClient);

// Экспортируем также сами клиенты, если они понадобятся напрямую
export { clientApiClient, financeApiClient, taskApiClient, penaltyApiClient };
