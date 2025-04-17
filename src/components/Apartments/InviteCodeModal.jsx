import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "../Universal/Modal";
import Heading from "../Universal/Heading";
import CustomButton from "../Universal/CustomButton";
import { userApi } from "../../api";
import CreateInviteCodeRequest from "../../generated-client-js/src/model/CreateInviteCodeRequest";

const InviteCodeModal = ({ onClose }) => {
  const [inviteCode, setInviteCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateInviteCode = () => {
    setIsLoading(true);
    setError(null);
    
    const apartmentId = localStorage.getItem('apartmentId');
    if (!apartmentId) {
      setIsLoading(false);
      setError("Квартира не найдена");
      return;
    }
    
    const request = new CreateInviteCodeRequest();
    request.apartmentId = apartmentId;
    
    userApi.createInviteCode(request, (error, data) => {
      setIsLoading(false);
      if (error) {
        console.error("Error generating invite code:", error);
        setError("Не удалось создать код приглашения");
      } else {
        setInviteCode(data.code);
      }
    });
  };

  useEffect(() => {
    generateInviteCode();
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
          {isLoading ? (
            <div className="font-mono text-lg font-bold tracking-wider text-gray-400">
              Загрузка...
            </div>
          ) : error ? (
            <div className="font-mono text-lg font-bold tracking-wider text-red-500">
              {error}
            </div>
          ) : (
            <div className="font-mono text-lg font-bold tracking-wider">
              {inviteCode}
            </div>
          )}
          <CustomButton
            text={copied ? "Скопировано!" : "Копировать"}
            onClick={handleCopyCode}
            variant={copied ? "filled" : "outlined"}
            disabled={isLoading || error}
          />
        </div>

        <p className="text-sm text-gray-500">
          Код действителен в течение 24 часов. После истечения срока действия
          вам нужно будет создать новый код.
        </p>

        {error && (
          <p className="text-sm text-red-500">
            Произошла ошибка при создании кода. Пожалуйста, попробуйте снова.
          </p>
        )}

        <div className="flex justify-end space-x-2 mt-6">
          <CustomButton text="Закрыть" onClick={onClose} variant="outlined" />
          <CustomButton
            text="Создать новый код"
            onClick={generateInviteCode}
            disabled={isLoading}
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
