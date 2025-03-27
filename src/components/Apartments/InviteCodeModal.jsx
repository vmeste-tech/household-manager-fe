import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "../Universal/Modal";
import Heading from "../Universal/Heading";
import CustomButton from "../Universal/CustomButton";

const InviteCodeModal = ({ onClose }) => {
  const [inviteCode, setInviteCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // В реальном приложении здесь будет API-запрос для получения кода
    // Симулируем генерацию кода
    const generatedCode = Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();
    setInviteCode(generatedCode);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal onClose={onClose}>
      <Heading>Пригласить нового жильца</Heading>
      <div className="mt-4 space-y-4">
        <p className="text-gray-600">
          Поделитесь этим кодом с человеком, которого хотите пригласить в
          квартиру:
        </p>

        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md">
          <div className="font-mono text-lg font-bold tracking-wider">
            {inviteCode}
          </div>
          <CustomButton
            text={copied ? "Скопировано!" : "Копировать"}
            onClick={handleCopyCode}
            variant={copied ? "filled" : "outlined"}
          />
        </div>

        <p className="text-sm text-gray-500">
          Код действителен в течение 24 часов. После истечения срока действия
          вам нужно будет создать новый код.
        </p>

        <div className="flex justify-end space-x-2 mt-6">
          <CustomButton text="Закрыть" onClick={onClose} variant="outlined" />
          <CustomButton
            text="Создать новый код"
            onClick={() => {
              const newCode = Math.random()
                .toString(36)
                .substring(2, 10)
                .toUpperCase();
              setInviteCode(newCode);
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

InviteCodeModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default InviteCodeModal;
