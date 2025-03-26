import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "../Universal/Modal";
import Heading from "../Universal/Heading";
import CustomButton from "../Universal/CustomButton";

const CreateRuleModal = ({ onClose, onCreate }) => {
  // Этап создания: 1 – базовые данные, 2 – расписание
  const [step, setStep] = useState(1);

  // Этап 1: базовые данные
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [penaltyAmount, setPenaltyAmount] = useState("");

  // Этап 2: настройки расписания
  const [frequency, setFrequency] = useState("daily"); // daily, weekly, monthly
  const [timeOfDay, setTimeOfDay] = useState(""); // формат "HH:MM"
  const [weeklyDays, setWeeklyDays] = useState([]); // для еженедельного расписания
  const [monthlyDay, setMonthlyDay] = useState(""); // для ежемесячного расписания
  const [timeZone, setTimeZone] = useState("");

  // Автоматически определяем часовой пояс
  useEffect(() => {
    const detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZone(detectedTimeZone);
  }, []);

  // Опции для дней недели
  const daysOfWeek = [
    { value: "MON", label: "Пн" },
    { value: "TUE", label: "Вт" },
    { value: "WED", label: "Ср" },
    { value: "THU", label: "Чт" },
    { value: "FRI", label: "Пт" },
    { value: "SAT", label: "Сб" },
    { value: "SUN", label: "Вс" },
  ];

  const toggleWeekDay = (day) => {
    if (weeklyDays.includes(day)) {
      setWeeklyDays(weeklyDays.filter((d) => d !== day));
    } else {
      setWeeklyDays([...weeklyDays, day]);
    }
  };

  // Функция генерации CRON-выражения из выбранных параметров
  const generateCronExpression = () => {
    if (!timeOfDay) return "";
    const [hourStr, minuteStr] = timeOfDay.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    let cron = "";
    if (frequency === "daily") {
      cron = `${minute} ${hour} * * *`;
    } else if (frequency === "weekly") {
      if (weeklyDays.length === 0) {
        cron = `${minute} ${hour} * * *`;
      } else {
        cron = `${minute} ${hour} * * ${weeklyDays.join(",")}`;
      }
    } else if (frequency === "monthly") {
      const dayOfMonth = monthlyDay || "1";
      cron = `${minute} ${hour} ${dayOfMonth} * *`;
    }
    return cron;
  };

  // Финальное сабмитация: собираем все данные и генерируем CRON-выражение
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!timeOfDay) {
      console.error("Введите время выполнения");
      return;
    }

    const cronExpression = generateCronExpression();

    // Получаем ID квартиры из localStorage
    const apartmentId = localStorage.getItem("apartmentId");
    if (!apartmentId) {
      console.error("ID квартиры не найден в localStorage");
      return;
    }

    const ruleData = {
      apartmentId,
      name,
      description,
      penaltyAmount: parseFloat(penaltyAmount) || 0,
      cronExpression,
      timeZone,
    };

    onCreate(ruleData);
  };

  return (
    <Modal onClose={onClose}>
      <Heading>Создать правило</Heading>
      {step === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep(2);
          }}
          className="mt-4 space-y-4"
        >
          <div>
            <label
              htmlFor="ruleName"
              className="block text-sm font-medium text-gray-700"
            >
              Название
            </label>
            <input
              id="ruleName"
              type="text"
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label
              htmlFor="ruleDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Описание
            </label>
            <textarea
              id="ruleDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label
              htmlFor="penaltyAmount"
              className="block text-sm font-medium text-gray-700"
            >
              Сумма штрафа
            </label>
            <input
              id="penaltyAmount"
              type="number"
              step="0.01"
              value={penaltyAmount}
              onChange={(e) => setPenaltyAmount(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <CustomButton text="Отмена" onClick={onClose} variant="outlined" />
            <CustomButton text="Далее" onClick={() => setStep(2)} />
          </div>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="frequency"
              className="block text-sm font-medium text-gray-700"
            >
              Периодичность
            </label>
            <select
              id="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="daily">Ежедневно</option>
              <option value="weekly">Еженедельно</option>
              <option value="monthly">Ежемесячно</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="timeOfDay"
              className="block text-sm font-medium text-gray-700"
            >
              Время выполнения
            </label>
            <input
              id="timeOfDay"
              type="time"
              value={timeOfDay}
              onChange={(e) => setTimeOfDay(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {frequency === "weekly" && (
            <div>
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Дни недели
              </span>
              <div className="flex flex-wrap gap-2">
                {daysOfWeek.map((day) => (
                  <div
                    type="button"
                    key={day.value}
                    onClick={() => toggleWeekDay(day.value)}
                    className={`px-3 py-1 border rounded-full text-sm transition-colors duration-150 ${
                      weeklyDays.includes(day.value)
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    {day.label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {frequency === "monthly" && (
            <div>
              <label
                htmlFor="monthlyDay"
                className="block text-sm font-medium text-gray-700"
              >
                День месяца
              </label>
              <input
                id="monthlyDay"
                type="number"
                min="1"
                max="31"
                value={monthlyDay}
                onChange={(e) => setMonthlyDay(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="timeZone"
              className="block text-sm font-medium text-gray-700"
            >
              Часовой пояс
            </label>
            <input
              id="timeZone"
              type="text"
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            <p className="text-xs text-gray-500">
              Автоматически определённый, можно изменить
            </p>
          </div>

          <div className="flex justify-end space-x-2">
            <CustomButton
              text="Назад"
              onClick={() => setStep(1)}
              variant="outlined"
            />
            <CustomButton text="Создать" onClick={handleSubmit} />
          </div>
        </form>
      )}
    </Modal>
  );
};

CreateRuleModal.propTypes = {
  /** Вызывается при закрытии модального окна */
  onClose: PropTypes.func.isRequired,
  /** Вызывается при создании правила, получает объект ruleData */
  onCreate: PropTypes.func.isRequired,
};

export default CreateRuleModal;
