import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "../Universal/Modal";
import Heading from "../Universal/Heading";
import CustomButton from "../Universal/CustomButton";
import CustomSelect from "../Universal/CustomSelect";

const CreateTaskModal = ({ onClose, onCreate, users = [], rules = [], error }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [ruleId, setRuleId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [localError, setLocalError] = useState("");

  // Обработка внешней ошибки
  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

  // Преобразуем массивы пользователей и правил в нужный формат для выпадающих списков
  const userOptions = users.map(user => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`
  }));

  const ruleOptions = rules.map(rule => ({
    id: rule.id,
    name: rule.name
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    // Получаем ID квартиры из localStorage
    const apartmentId = localStorage.getItem("apartmentId");
    if (!apartmentId) {
      setLocalError("ID квартиры не найден");
      return;
    }

    // Проверяем обязательные поля
    if (!title.trim()) {
      setLocalError("Введите название задачи");
      return;
    }

    if (!description.trim()) {
      setLocalError("Введите описание задачи");
      return;
    }

    if (!scheduledAt) {
      setLocalError("Укажите дату и время выполнения");
      return;
    }

    if (!ruleId) {
      setLocalError("Выберите правило для задачи");
      return;
    }

    if (!assignedTo) {
      setLocalError("Назначьте исполнителя задачи");
      return;
    }

    // Собираем данные задачи
    const taskData = {
      title,
      description,
      scheduledAt: new Date(scheduledAt).toISOString(),
      apartmentId,
      ruleId,
      assignedTo
    };

    onCreate(taskData);
  };

  return (
    <Modal onClose={onClose}>
      <Heading>Создать задачу</Heading>
      
      {localError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{localError}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Заголовок
          </label>
          <input
            id="title"
            type="text"
            maxLength={100}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Описание
          </label>
          <textarea
            id="description"
            maxLength={500}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label
            htmlFor="scheduledAt"
            className="block text-sm font-medium text-gray-700"
          >
            Дата и время выполнения
          </label>
          <input
            id="scheduledAt"
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Выпадающий список для правила */}
        <CustomSelect
          id="rule"
          label="Правило"
          value={ruleId}
          onChange={(e) => setRuleId(e.target.value)}
          options={ruleOptions}
          placeholder="Выберите правило"
          required={true}
        />

        {/* Выпадающий список для пользователя */}
        <CustomSelect
          id="assignedTo"
          label="Назначено на"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          options={userOptions}
          placeholder="Выберите пользователя"
          required={true}
        />

        <div className="flex justify-end space-x-2">
          <CustomButton text="Отмена" onClick={onClose} variant="outlined" />
          <CustomButton text="Создать" onClick={handleSubmit} />
        </div>
      </form>
    </Modal>
  );
};

CreateTaskModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  users: PropTypes.array,
  rules: PropTypes.array,
  error: PropTypes.string
};

export default CreateTaskModal;
