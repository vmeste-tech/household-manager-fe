import CustomButton from "../Universal/CustomButton";
import FileDropZone from "../Universal/FileDropZone";
import Modal from "../Universal/Modal";
import Heading from "../Universal/Heading";
import PropTypes from 'prop-types';

const AvatarUploadModal = ({
  isOpen,
  uploadedAvatar,
  onClose,
  onFileSelect,
  onApply,
}) => {
  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <Heading>Загрузка фотографии профиля</Heading>
      <p className="text-gray-600 mb-4">
        Загрузите фотографию профиля. Поддерживаются форматы JPG, PNG.
        Рекомендуемый размер: не менее 200×200 пикселей.
      </p>

      {uploadedAvatar && (
        <div className="flex justify-center mb-4">
          <div className="relative">
            <img
              src={uploadedAvatar}
              alt="Preview"
              className="w-32 h-32 rounded-full object-cover border-2 border-indigo-600"
            />
            <button
              onClick={() => onFileSelect(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              title="Удалить"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <FileDropZone onFileSelect={onFileSelect} />

      <div className="flex justify-end space-x-2 mt-4">
        <CustomButton text="Отмена" variant="outlined" onClick={onClose} />
        <CustomButton
          text="Применить"
          variant="filled"
          onClick={onApply}
          disabled={!uploadedAvatar}
        />
      </div>
    </Modal>
  );
};
AvatarUploadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  uploadedAvatar: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onFileSelect: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
};

export default AvatarUploadModal;
