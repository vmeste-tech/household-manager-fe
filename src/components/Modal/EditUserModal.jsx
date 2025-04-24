import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../Universal/Modal";
import Heading from "../Universal/Heading";
import CustomButton from "../Universal/CustomButton";

const EditUserModal = ({ user, onClose, onSave }) => {
  const [status, setStatus] = useState(user.status);
  const [isSaving, setIsSaving] = useState(false);

  const statusOptions = [
    { id: "ACTIVE", name: "Активен" },
    { id: "AWAY", name: "В отпуске" },
    { id: "SICK", name: "Заболел" },
    { id: "Выселился", name: "Выселился" },
  ];

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    // Предотвращаем повторную отправку запроса
    if (isSaving) return;
    
    setIsSaving(true);

    const updatedUser = {
      ...user,
      status,
    };

    // Вызываем функцию сохранения и закрытия модального окна
    onSave(updatedUser);
    
    // Не закрываем модальное окно сразу, это произойдет после успешной обработки в родительском компоненте
    // Но для улучшения UX можно добавить таймаут
    setTimeout(() => {
      setIsSaving(false);
      onClose();
    }, 500);
  };

  const handleSaveClick = () => {
    handleSubmit();
  };

  return (
    <Modal onClose={onClose}>
      <Heading>Изменить статус пользователя</Heading>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={user.photo}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">{user.firstName} {user.lastName}</p>
          </div>
        </div>
        
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Статус
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={isSaving}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {statusOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <CustomButton 
            text="Отмена" 
            onClick={onClose} 
            variant="outlined" 
            disabled={isSaving}
          />
          <CustomButton 
            text={isSaving ? "Сохранение..." : "Сохранить"} 
            onClick={handleSaveClick}
            disabled={isSaving}
          />
        </div>
      </form>
    </Modal>
  );
};

EditUserModal.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditUserModal;
