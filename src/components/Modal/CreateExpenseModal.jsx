import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../Universal/Modal";
import Heading from "../Universal/Heading";
import CustomButton from "../Universal/CustomButton";
import CustomSelect from "../Universal/CustomSelect";
import FileDropZone from "../Universal/FileDropZone";

const CreateExpenseModal = ({ onClose, onCreate, expenseItems }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [photoBase64, setPhotoBase64] = useState("");
  const [selectedItemId, setSelectedItemId] = useState("");

  const handleFileSelect = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      console.error("Неверное значение суммы");
      return;
    }
    if (!selectedItemId) {
      console.error("Выберите статью затрат");
      return;
    }

    const expenseData = {
      amount: parsedAmount,
      description,
      photoBase64,
      itemId: selectedItemId,
    };

    onCreate(expenseData);
  };

  return (
    <Modal onClose={onClose}>
      <Heading>Внести затрату</Heading>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Сумма
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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

        <div>
          <CustomSelect
            id="expenseItem"
            label="Статья затрат"
            value={selectedItemId}
            onChange={(e) => setSelectedItemId(e.target.value)}
            options={expenseItems}
            placeholder="Выберите статью"
          />
        </div>

        <div>
          <FileDropZone onFileSelect={handleFileSelect} />
        </div>

        <div className="flex justify-end space-x-2">
          <CustomButton text="Отмена" onClick={onClose} variant="outlined" />
          <CustomButton text="Сохранить" onClick={handleSubmit} />
        </div>
      </form>
    </Modal>
  );
};

CreateExpenseModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  expenseItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CreateExpenseModal;
