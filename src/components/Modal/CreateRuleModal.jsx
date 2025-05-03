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
  const [autoCreateTasks, setAutoCreateTasks] = useState(false);

  // Состояние для хранения ошибок валидации
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    timeOfDay: "",
    weeklyDays: "",
    monthlyDay: ""
  });

  // Этап 2: настройки расписания
  const [frequency, setFrequency] = useState("daily");
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

  // Функция для валидации полей первого шага
  const validateStep1 = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Название правила обязательно";
      isValid = false;
    } else {
      newErrors.name = "";
    }

    if (!description.trim()) {
      newErrors.description = "Описание правила обязательно";
      isValid = false;
    } else {
      newErrors.description = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  // Функция для валидации полей второго шага
  const validateStep2 = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!timeOfDay) {
      newErrors.timeOfDay = "Время выполнения обязательно";
      isValid = false;
    } else {
      newErrors.timeOfDay = "";
    }

    if (frequency === "weekly" && weeklyDays.length === 0) {
      newErrors.weeklyDays = "Выберите хотя бы один день недели";
      isValid = false;
    } else {
      newErrors.weeklyDays = "";
    }

    if (frequency === "monthly" && !monthlyDay) {
      newErrors.monthlyDay = "Укажите день месяца";
      isValid = false;
    } else {
      newErrors.monthlyDay = "";
    }

    setErrors(newErrors);
    return isValid;
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

    // Проверяем валидацию в зависимости от текущего шага
    if (step === 1 && !autoCreateTasks) {
      if (!validateStep1()) {
        return;
      }
    } else if (step === 2 || (step === 1 && autoCreateTasks)) {
      if (!validateStep1()) {
        return;
      }
      
      if (autoCreateTasks && !validateStep2()) {
        return;
      }
    }

    // Генерируем CRON-выражение только если автоматическое создание задач включено
    const cronExpression = autoCreateTasks ? generateCronExpression() : "";

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
      autoCreateTasks,
    };

    onCreate(ruleData);
  };

  return (
    <Modal onClose={onClose}>
      <Heading>Создать правило</Heading>
      {step === 1 && (
        <div className="mt-4 space-y-4">
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
              className={`mt-1 block w-full border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md p-2`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
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
              className={`mt-1 block w-full border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded-md p-2`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
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

          {/* Чекбокс для автоматического создания задач */}
          <div className="flex items-center">
            <input
              id="autoCreateTasks"
              type="checkbox"
              checked={autoCreateTasks}
              onChange={(e) => setAutoCreateTasks(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor="autoCreateTasks"
              className="ml-2 block text-sm text-gray-700"
            >
              Автоматически создавать задачи по этому правилу
            </label>
          </div>

          <div className="flex justify-end space-x-2">
            <CustomButton text="Отмена" onClick={onClose} variant="outlined" />
            <CustomButton 
              text={autoCreateTasks ? "Далее" : "Создать"} 
              onClick={(e) => {
                e.preventDefault();
                if (autoCreateTasks) {
                  if (validateStep1()) {
                    setStep(2);
                  }
                } else {
                  handleSubmit(e);
                }
              }}
            />
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="mt-4 space-y-4">
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
              className={`mt-1 block w-full border ${
                errors.timeOfDay ? "border-red-500" : "border-gray-300"
              } rounded-md p-2`}
            />
            {errors.timeOfDay && (
              <p className="mt-1 text-sm text-red-600">{errors.timeOfDay}</p>
            )}
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
                    className={`px-3 py-1 border rounded-full text-sm transition-colors duration-150 cursor-pointer ${
                      weeklyDays.includes(day.value)
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    {day.label}
                  </div>
                ))}
              </div>
              {errors.weeklyDays && (
                <p className="mt-1 text-sm text-red-600">{errors.weeklyDays}</p>
              )}
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
                className={`mt-1 block w-full border ${
                  errors.monthlyDay ? "border-red-500" : "border-gray-300"
                } rounded-md p-2`}
              />
              {errors.monthlyDay && (
                <p className="mt-1 text-sm text-red-600">{errors.monthlyDay}</p>
              )}
            </div>
          )}

          {/* Удаляем поле ввода для часового пояса и просто показываем информацию */}
          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1 md:flex md:justify-between">
                <p className="text-sm text-blue-700">
                  Используется часовой пояс: <span className="font-medium">{timeZone}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <CustomButton
              text="Назад"
              onClick={() => setStep(1)}
              variant="outlined"
            />
            <CustomButton 
              text="Создать" 
              onClick={handleSubmit} 
            />
          </div>
        </div>
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
