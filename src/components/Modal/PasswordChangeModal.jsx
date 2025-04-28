import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../Universal/Modal";
import CustomButton from "../Universal/CustomButton";

const PasswordChangeModal = ({ isOpen, onClose, onSave }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Функция валидации старого пароля
  const validateOldPassword = (password) => {
    if (!password) {
      return "Текущий пароль обязателен";
    }
    return "";
  };

  // Функция валидации нового пароля
  const validateNewPassword = (password) => {
    if (!password) {
      return "Новый пароль обязателен";
    }
    if (password.length < 8) {
      return "Пароль должен содержать не менее 8 символов";
    }
    return "";
  };

  // Функция валидации подтверждения пароля
  const validateConfirmPassword = (confirmPass, newPass) => {
    if (!confirmPass) {
      return "Подтверждение пароля обязательно";
    }
    if (confirmPass !== newPass) {
      return "Пароли не совпадают";
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {
      oldPassword: validateOldPassword(oldPassword),
      newPassword: validateNewPassword(newPassword),
      confirmPassword: validateConfirmPassword(confirmPassword, newPassword)
    };
    
    setErrors(newErrors);
    
    // Форма валидна, если нет ошибок
    return !Object.values(newErrors).some(error => error);
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }
    
    onSave({
      oldPassword,
      newPassword
    });
    
    // Очищаем форму
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Изменение пароля</h2>
        <div>
          <div className="mb-4">
            <label className="block mb-1 text-xs font-medium uppercase tracking-wider">
              Текущий пароль
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className={`w-full px-3 py-2 border rounded ${
                errors.oldPassword ? "border-red-300" : "border-gray-300"
              } focus:outline-none focus:border-indigo-600`}
              placeholder="Введите текущий пароль"
            />
            {errors.oldPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.oldPassword}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-xs font-medium uppercase tracking-wider">
              Новый пароль
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`w-full px-3 py-2 border rounded ${
                errors.newPassword ? "border-red-300" : "border-gray-300"
              } focus:outline-none focus:border-indigo-600`}
              placeholder="Введите новый пароль"
            />
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-xs font-medium uppercase tracking-wider">
              Подтвердите новый пароль
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-3 py-2 border rounded ${
                errors.confirmPassword ? "border-red-300" : "border-gray-300"
              } focus:outline-none focus:border-indigo-600`}
              placeholder="Подтвердите новый пароль"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <CustomButton
              text="Отмена"
              variant="outlined"
              onClick={onClose}
            />
            <CustomButton
              text="Сохранить"
              variant="filled"
              onClick={handleSave}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

PasswordChangeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default PasswordChangeModal;
