import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import WeeklyTasksChart from "./WeeklyTasksChart";

const TasksCard = ({ tasksData }) => {
  const navigate = useNavigate();
  
  // Данные по умолчанию для графика, если реальных данных нет
  const defaultTasksData = [
    { label: "П", count: 5 },
    { label: "В", count: 10 },
    { label: "С", count: 3 },
    { label: "Ч", count: 8 },
    { label: "П", count: 12 },
    { label: "С", count: 7 },
    { label: "В", count: 4 },
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
            <WeeklyTasksChart tasksData={tasksData || defaultTasksData} />
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

TasksCard.propTypes = {
  tasksData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired
    })
  )
};

export default TasksCard;
