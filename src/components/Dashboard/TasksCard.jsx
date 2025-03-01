import { useNavigate } from "react-router-dom";
import WeeklyTasksChart from "./WeeklyTasksChart";

const TasksCard = () => {
  const navigate = useNavigate();
  const tasksData = [
    { label: "M", count: 5 },
    { label: "T", count: 10 },
    { label: "W", count: 3 },
    { label: "T", count: 8 },
    { label: "F", count: 12 },
    { label: "S", count: 7 },
    { label: "S", count: 4 },
  ];

  const handleClick = () => {
    navigate("/tasks");
  };

  return (
    <div className="relative">
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
      {/* Невидимая кнопка, которая перекрывает всю карточку */}
      <button
        onClick={handleClick}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  );
};

export default TasksCard;
