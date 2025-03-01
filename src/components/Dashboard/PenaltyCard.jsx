import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const MonthlyFinesCard = ({ finesCount, totalFines }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/penalties");
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up flex flex-col">
        <h3 className="text-xl font-bold text-indigo-800">Штрафы</h3>

        {/* Основная статистика в виде двух колонок */}
        <div className="flex justify-around items-center flex-grow mb-4">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-indigo-800">
              {finesCount}
            </span>
            <span className="text-sm text-gray-600">штрафов получено</span>
          </div>
          <div className="flex flex-col items-center border-l border-gray-300 pl-6">
            <span className="text-4xl font-bold text-indigo-800">
              {totalFines} руб.
            </span>
            <span className="text-sm text-gray-600">на штрафы потрачено</span>
          </div>
        </div>

        {/* Пометка о текущем месяце */}
        <div className="mt-auto text-center text-xs text-gray-500">
          Текущий месяц
        </div>
      </div>
      {/* Невидимая кнопка, перекрывающая карточку */}
      <button
        onClick={handleClick}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  );
};

MonthlyFinesCard.propTypes = {
  finesCount: PropTypes.number.isRequired,
  totalFines: PropTypes.number.isRequired,
};

export default MonthlyFinesCard;
