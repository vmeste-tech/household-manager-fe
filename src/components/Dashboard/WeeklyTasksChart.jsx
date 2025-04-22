import PropTypes from "prop-types";

const WeeklyTasksChart = ({ tasksData }) => {
  // Если данные не переданы, используем значения по умолчанию:
  const defaultData = [
    { label: "П", count: 4 },
    { label: "В", count: 16 },
    { label: "С", count: 24 },
    { label: "Ч", count: 32 },
    { label: "П", count: 20 },
    { label: "С", count: 10 },
    { label: "В", count: 10 },
  ];

  const data = tasksData || defaultData;

  // Определяем текущий день недели (считая, что неделя начинается с понедельника)
  const today = new Date();
  const jsDay = today.getDay(); // 0 (воскресенье) - 6 (суббота)
  const currentDayIndex = jsDay === 0 ? 6 : jsDay - 1;

  // Находим максимальное количество задач для масштабирования высоты
  const maxCount = Math.max(...data.map((day) => day.count), 1);
  // Задаём максимальную высоту столбца (в пикселях)
  const maxHeightPx = 128;

  return (
    <div className="grid grid-cols-7 gap-1 flex-grow self-stretch">
      {data.map((day, index) => {
        // Вычисляем высоту столбца пропорционально count
        const computedHeight = (day.count / maxCount) * maxHeightPx;
        return (
          <div key={index} className="flex flex-col justify-end items-center">
            <div
              className={`w-4 mx-auto rounded-full ${
                index === currentDayIndex ? "bg-indigo-800" : "bg-indigo-300"
              }`}
              style={{ height: `${computedHeight}px` }}
            ></div>
            <div className="text-center text-xs text-gray-400 font-semibold mt-2">
              {day.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

WeeklyTasksChart.propTypes = {
  tasksData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  )
};

export default WeeklyTasksChart;
