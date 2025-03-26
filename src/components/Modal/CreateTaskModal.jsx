import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../Universal/Modal";
import Heading from "../Universal/Heading";
import CustomButton from "../Universal/CustomButton";
import CustomSelect from "../Universal/CustomSelect";

const CreateTaskModal = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [ruleId, setRuleId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  // Пример данных для правил квартиры и пользователей
  const sampleRules = [
    { id: "rule1", name: "Правило 1" },
    { id: "rule2", name: "Правило 2" },
  ];

  const sampleUsers = [
    { id: "user1", name: "Пользователь 1" },
    { id: "user2", name: "Пользователь 2" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Получаем ID квартиры из localStorage
    const apartmentId = localStorage.getItem("apartmentId");
    if (!apartmentId) {
      console.error("ID квартиры не найден в localStorage");
      return;
    }

    // Собираем данные задачи
    const taskData = {
      title,
      description,
      scheduledAt,
      apartmentId,
    };

    // Опциональные поля
    if (ruleId.trim()) {
      taskData.ruleId = ruleId;
    }
    if (assignedTo.trim()) {
      taskData.assignedTo = assignedTo;
    }

    onCreate(taskData);
  };

  return (
    <Modal onClose={onClose}>
      <Heading>Создать задачу</Heading>
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
            Дата и время (по расписанию)
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
          label="Правило (опционально)"
          value={ruleId}
          onChange={(e) => setRuleId(e.target.value)}
          options={sampleRules}
          placeholder="Не выбрано"
        />

        {/* Выпадающий список для пользователя */}
        <CustomSelect
          id="assignedTo"
          label="Назначено на (опционально)"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          options={sampleUsers}
          placeholder="Не выбрано"
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
};

export default CreateTaskModal;
