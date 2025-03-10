const TaskStats = () => {
  // Пример данных статистики – в реальном приложении их можно получать через props или из состояния/сервера
  const stats = {
    total: 128,
    active: 34,
    completed: 85,
    overdue: 9,
  };

  return (
    <div className="bg-gradient-to-r from-blue-800 to-indigo-900 w-full rounded-xl">
      <div className="max-w-7xl mx-auto py-4 px-2 sm:py-6 sm:px-3 lg:px-4 lg:py-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="pb-1 text-4xl font-extrabold text-white">
            Статистика задач
          </h2>
          <p className="mt-3 text-lg text-white">
            Обзор текущей статистики по вашим задачам
          </p>
        </div>
        <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-4 sm:gap-8">
          <div className="flex flex-col">
            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-white">
              Всего задач
            </dt>
            <dd className="order-1 text-5xl font-extrabold text-white">
              {stats.total}
            </dd>
          </div>
          <div className="flex flex-col mt-10 sm:mt-0">
            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-white">
              Активных
            </dt>
            <dd className="order-1 text-5xl font-extrabold text-white">
              {stats.active}
            </dd>
          </div>
          <div className="flex flex-col mt-10 sm:mt-0">
            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-white">
              Выполнено
            </dt>
            <dd className="order-1 text-5xl font-extrabold text-white">
              {stats.completed}
            </dd>
          </div>
          <div className="flex flex-col mt-10 sm:mt-0">
            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-white">
              Просрочено
            </dt>
            <dd className="order-1 text-5xl font-extrabold text-white">
              {stats.overdue}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default TaskStats;
