import { useState } from "react";
import PropTypes from "prop-types";
import CustomButton from "../Universal/CustomButton";

// Добавим функцию для преобразования CRON-выражения в читаемый формат
const formatCronExpression = (cronExpression) => {
  if (!cronExpression) return "Не указана";

  const parts = cronExpression.split(" ");
  if (parts.length !== 5) return "Неверный формат";

  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;

  // Форматируем время
  const timeStr = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;

  // Дни недели в читаемом формате
  const daysMap = {
    MON: "Пн",
    TUE: "Вт",
    WED: "Ср",
    THU: "Чт",
    FRI: "Пт",
    SAT: "Сб",
    SUN: "Вс",
  };

  // Определяем тип расписания
  if (dayOfMonth === "*" && dayOfWeek === "*") {
    return `Ежедневно в ${timeStr}`;
  } else if (dayOfMonth === "*" && dayOfWeek !== "*") {
    const days = dayOfWeek
      .split(",")
      .map((day) => daysMap[day] || day)
      .join(", ");
    return `Еженедельно в ${timeStr} (${days})`;
  } else if (dayOfMonth !== "*" && dayOfWeek === "*") {
    return `Ежемесячно ${dayOfMonth} числа в ${timeStr}`;
  } else if (month !== "*") {
    const months = {
      1: "Янв", 2: "Фев", 3: "Мар", 4: "Апр", 5: "Май", 6: "Июн", 
      7: "Июл", 8: "Авг", 9: "Сен", 10: "Окт", 11: "Ноя", 12: "Дек"
    };
    const monthNames = month.split(",").map(m => months[m] || m).join(", ");
    return `${timeStr} (только ${monthNames})`;
  }

  return `${timeStr}, ${cronExpression}`;
};

const RuleDetails = ({ rule, styleConfig, onClose, onVote }) => {
  const [userVote, setUserVote] = useState(null);

  const handleVote = (voteType) => {
    setUserVote(voteType);
    onVote(rule.id, voteType);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div
          className={`h-2 bg-gradient-to-r ${styleConfig.gradientClass}`}
        ></div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  viewBox={styleConfig.svgViewBox}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={styleConfig.svgPath}
                  />
                </svg>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-800">
                  {rule.title}
                </div>
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${styleConfig.badgeClass} mt-1`}
                >
                  {rule.status}
                </span>
              </div>
            </div>
            <div
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm font-medium text-gray-500 mb-2">
              Описание
            </div>
            <p className="text-gray-700">{rule.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-sm font-medium text-gray-500 mb-2">
                Штраф
              </div>
              <p className="text-lg font-semibold text-indigo-600">
                {rule.fine}
              </p>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-2">
                Создано
              </div>
              <p className="text-gray-700">
                {new Date(rule.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-2">
                Автор
              </div>
              <p className="text-gray-700">{rule.createdBy}</p>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-2">
                Результаты голосования
              </div>
              <div className="flex items-center">
                <span className="font-medium text-green-600 mr-2">
                  {rule.votesFor}
                </span>
                <svg
                  className="h-4 w-4 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium text-red-600 mx-2">
                  {rule.votesAgainst}
                </span>
                <svg
                  className="h-4 w-4 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            {/* Добавляем новый блок для периодичности */}
            <div>
              <div className="text-sm font-medium text-gray-500 mb-2">
                Периодичность
              </div>
              <div className="flex items-center">
                <svg
                  className="h-4 w-4 text-indigo-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-gray-700 mb-0">
                  {formatCronExpression(rule.cronExpression, rule.timeZone)}
                </p>
              </div>
            </div>
          </div>

          {rule.status === "На голосовании" && (
            <div className="border-t border-gray-100 pt-6">
              <div className="text-sm font-medium text-gray-500 mb-4">
                Ваш голос
              </div>
              {userVote ? (
                <div className="flex items-center justify-center space-x-2 py-1">
                  <svg
                    className={`w-5 h-5 ${
                      userVote === "за" ? "text-green-500" : "text-red-500"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={
                        userVote === "за"
                          ? "M5 13l4 4L19 7" // checkmark for "за"
                          : "M6 18L18 6M6 6l12 12" // X for "против"
                      }
                    />
                  </svg>
                  <span
                    className={`font-medium ${
                      userVote === "за" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {userVote}
                  </span>
                </div>
              ) : (
                <div className="flex justify-center space-x-3">
                  <CustomButton
                    text="За"
                    onClick={() => handleVote("за")}
                    variant="filled"
                  />
                  <CustomButton
                    text="Против"
                    onClick={() => handleVote("против")}
                    variant="outlined"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

RuleDetails.propTypes = {
  rule: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    fine: PropTypes.string.isRequired,
    votesFor: PropTypes.number.isRequired,
    votesAgainst: PropTypes.number.isRequired,
    createdBy: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    cronExpression: PropTypes.string,
    timeZone: PropTypes.string,
  }).isRequired,
  styleConfig: PropTypes.shape({
    gradientClass: PropTypes.string.isRequired,
    svgPath: PropTypes.string.isRequired,
    svgViewBox: PropTypes.string.isRequired,
    badgeClass: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onVote: PropTypes.func.isRequired,
};

export default RuleDetails;
