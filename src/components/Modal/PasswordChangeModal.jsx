import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../Universal/Modal";
import CustomButton from "../Universal/CustomButton";
import Heading from "../Universal/Heading";

const PasswordChangeModal = ({ isOpen, onClose, onSave }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChangePassword = () => {
    // Reset previous errors
    setPasswordError("");

    // Validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordError("Пожалуйста, заполните все поля");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Новые пароли не совпадают");
      return;
    }

    // Call parent handler with password data
    onSave({ oldPassword, newPassword });

    // Reset form
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <div className="p-4">
        <Heading>Изменение пароля</Heading>

        {passwordError && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {passwordError}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block mb-1 mt-4 text-xs font-medium uppercase tracking-wider">
              Старый пароль
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Введите текущий пароль"
              className="w-full px-3 py-2 border rounded !border-gray-300 focus:outline-none focus:!border-indigo-600"
            />
          </div>

          <div>
            <label className="block mb-1 text-xs font-medium uppercase tracking-wider">
              Новый пароль
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Введите новый пароль"
              className="w-full px-3 py-2 border rounded !border-gray-300 focus:outline-none focus:!border-indigo-600"
            />
          </div>

          <div>
            <label className="block mb-1 text-xs font-medium uppercase tracking-wider">
              Подтверждение пароля
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Повторите новый пароль"
              className="w-full px-3 py-2 border rounded !border-gray-300 focus:outline-none focus:!border-indigo-600"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <CustomButton text="Отмена" variant="outlined" onClick={onClose} />
          <CustomButton
            text="Сохранить"
            variant="filled"
            onClick={handleChangePassword}
          />
        </div>
      </div>
    </Modal>
  );
};

PasswordChangeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default PasswordChangeModal;
