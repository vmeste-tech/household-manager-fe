import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../Universal/Modal";
import Heading from "../Universal/Heading";
import CustomButton from "../Universal/CustomButton";
import CustomSelect from "../Universal/CustomSelect";

const EditUserModal = ({ user, onClose, onSave }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [type, setType] = useState(user.type);
  const [status, setStatus] = useState(user.status);

  const typeOptions = [
    { id: "Admin", name: "Администратор" },
    { id: "User", name: "Пользователь" },
  ];

  const statusOptions = [
    { id: "Активен", name: "Активен" },
    { id: "В отпуске", name: "В отпуске" },
    { id: "Заболел", name: "Заболел" },
    { id: "Выселился", name: "Выселился" },
  ];

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const updatedUser = {
      ...user,
      firstName,
      lastName,
      type,
      status,
    };

    // Вызываем функцию сохранения и закрытия модального окна
    onSave(updatedUser);
  };

  const handleSaveClick = () => {
    handleSubmit();
  };

  return (
    <Modal onClose={onClose}>
      <Heading>Редактировать пользователя</Heading>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            Имя
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Фамилия
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <CustomSelect
            id="userType"
            label="Тип пользователя"
            value={type}
            onChange={(e) => setType(e.target.value)}
            options={typeOptions}
          />
        </div>

        <div>
          <CustomSelect
            id="userStatus"
            label="Статус"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={statusOptions}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <CustomButton text="Отмена" onClick={onClose} variant="outlined" />
          <CustomButton
            text="Сохранить"
            onClick={handleSaveClick}
            type="button"
          />
        </div>
      </form>
    </Modal>
  );
};

EditUserModal.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    joinTime: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditUserModal;
