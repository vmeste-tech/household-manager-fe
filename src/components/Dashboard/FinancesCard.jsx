import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const FinancesCard = ({ balance = 0 }) => {
  const navigate = useNavigate();

  // Массив с названиями месяцев на русском
  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  const currentMonth = monthNames[new Date().getMonth()];

  return (
    <div className="relative">
      <div
        className="bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="flex flex-col h-full">
          <h3 className="text-xl font-bold text-indigo-800">Финансы</h3>
          <div className="flex flex-col flex-1 justify-center items-center">
            {/* Большими цифрами показываем сумму */}
            <div className="text-5xl font-bold text-indigo-800">
              {Math.abs(balance)} руб
            </div>
            {/* Текст сообщения с уменьшенным отступом */}
            <div className="mt-2 text-lg text-gray-600">
              {balance >= 0
                ? `вам должны за ${currentMonth}`
                : `вы должны за ${currentMonth}`}
            </div>
          </div>
        </div>
      </div>
      {/* Невидимая кнопка для навигации */}
      <button
        onClick={() => navigate("/finances")}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  );
};

FinancesCard.propTypes = {
  balance: PropTypes.number
};

export default FinancesCard;
