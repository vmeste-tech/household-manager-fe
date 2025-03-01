import WeeklyTasksChart from "./WeeklyTasksChart";

const TasksCard = () => {
  const tasksData = [
    { label: "M", count: 5 },
    { label: "T", count: 10 },
    { label: "W", count: 3 },
    { label: "T", count: 8 },
    { label: "F", count: 12 },
    { label: "S", count: 7 },
    { label: "S", count: 4 },
  ];

  return (
    <div
      className="bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up"
      style={{ animationDelay: "0.3s" }}
    >
      <div className="flex flex-col h-full">
        <h3 className="text-xl font-bold text-indigo-800">Задачи</h3>
        <div className="mt-auto">
          <WeeklyTasksChart tasksData={tasksData} />
        </div>
      </div>
    </div>
  );
};

export default TasksCard;
