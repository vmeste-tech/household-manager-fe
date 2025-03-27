import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../Universal/Modal";
import Heading from "../Universal/Heading";
import CustomButton from "../Universal/CustomButton";

const CreateExpenseItemModal = ({ onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Получаем apartmentId из localStorage
    const apartmentId = localStorage.getItem("apartmentId");
    if (!apartmentId) {
      console.error("ID квартиры не найден в localStorage");
      return;
    }

    // Собираем данные для DTO ExpenseItemCreateDto
    const expenseItemData = {
      apartmentId,
      name,
      description,
    };

    onCreate(expenseItemData);
  };

  return (
    <Modal onClose={onClose}>
      <Heading>Создать статью затрат</Heading>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Название статьи
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <CustomButton text="Отмена" onClick={onClose} variant="outlined" />
          <CustomButton text="Создать" onClick={handleSubmit} />
        </div>
      </form>
    </Modal>
  );
};

CreateExpenseItemModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default CreateExpenseItemModal;
