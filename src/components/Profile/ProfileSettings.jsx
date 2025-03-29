import { useState, useEffect } from "react";
import PasswordChangeModal from "../Modal/PasswordChangeModal";
import AvatarDisplay from "./AvatarDisplay";
import ProfileForm from "./ProfileForm";
import AvatarUploadModal from "./AvatarUploadModal";
import { userApi } from "../../api";

export default function AccountSettings() {
  const [showFileDropZone, setShowFileDropZone] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [uploadedAvatar, setUploadedAvatar] = useState(null);

  // Временные данные пользователя для предпросмотра интерфейса
  const mockUser = {
    firstName: "Иван",
    lastName: "Иванов",
    email: "ivan@example.com",
    status: "Активен",
    avatar: null,
  };

  const [user, setUser] = useState(mockUser);
  const [loading, setLoading] = useState(false);

  // Обработчик выбора файла
  const handleFileSelect = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedAvatar(reader.result);
        console.log("Файл выбран и готов к загрузке:", file.name);
      };
      reader.readAsDataURL(file);
    } else {
      setUploadedAvatar(null);
    }
  };

  // Функция удаления аватара
  const handleDeleteAvatar = () => {
    setUploadedAvatar(null);
    setUser((prev) => ({ ...prev, avatar: null }));
    console.log("Аватар удален");
  };

  // Закрытие модального окна и применение загруженного аватара
  const handleCloseAndApply = () => {
    if (uploadedAvatar) {
      setUser((prev) => ({ ...prev, avatar: uploadedAvatar }));
    }
    setShowFileDropZone(false);
  };

  // Раскомментируем и модифицируем запрос API для отображения данных по умолчанию
  useEffect(() => {
    setLoading(true);

    userApi.getUser((error, data) => {
      setLoading(false);
      if (error) {
        console.error("Ошибка получения данных пользователя:", error);
        // Используем данные по умолчанию, если API не отвечает
        setUser(mockUser);
      } else {
        console.log("Получены данные пользователя:", data);
        setUser(data);
      }
    });
  }, []);

  const handlePasswordChange = (passwordData) => {
    console.log("Changing password:", passwordData);
    setShowPasswordModal(false);
  };

  const handleFormSubmit = () => {
    console.log("Сохранение данных");
    // В реальном приложении здесь был бы вызов API
  };

  // Если данные еще не загрузились, показываем индикатор загрузки
  if (loading) {
    return (
      <div className="p-8 bg-white rounded-xl text-center">
        <p>Загрузка данных пользователя...</p>
      </div>
    );
  }

  // Если по какой-то причине данных нет, можно показать сообщение
  if (!user) {
    return (
      <div className="p-8 bg-white rounded-xl text-center">
        <p>Данные пользователя не найдены</p>
      </div>
    );
  }

  return (
    <>
      <AvatarUploadModal
        isOpen={showFileDropZone}
        uploadedAvatar={uploadedAvatar}
        onClose={() => setShowFileDropZone(false)}
        onFileSelect={handleFileSelect}
        onApply={handleCloseAndApply}
      />

      <PasswordChangeModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSave={handlePasswordChange}
      />

      <div className="p-8 bg-white rounded-xl">
        <div className="text-2xl font-bold mb-6">Настройки</div>

        <AvatarDisplay
          avatarUrl={user.avatar}
          onUploadClick={() => setShowFileDropZone(true)}
          onDeleteClick={handleDeleteAvatar}
        />

        <ProfileForm
          user={user}
          onPasswordChange={() => setShowPasswordModal(true)}
          onSubmit={handleFormSubmit}
        />
      </div>
    </>
  );
}
