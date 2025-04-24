import { useState, useEffect } from "react";
import AvatarDisplay from "./AvatarDisplay";
import ProfileForm from "./ProfileForm";
import { userApi } from "../../api";
import AvatarUploadModal from "./AvatarUploadModal";
import PasswordChangeModal from "../Modal/PasswordChangeModal";
import UpdateUserProfileRequest from "../../generated-client-js/src/model/UpdateUserProfileRequest";

export default function AccountSettings() {
  const [showFileDropZone, setShowFileDropZone] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [uploadedAvatar, setUploadedAvatar] = useState(null);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    status: "ACTIVE",
    avatar: null,
  });
  const [loading, setLoading] = useState(true);
  const [updateStatus, setUpdateStatus] = useState({ success: false, error: null });

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

  // Загрузка данных пользователя при монтировании компонента
  useEffect(() => {
    setLoading(true);

    userApi.getUser((error, data) => {
      setLoading(false);
      if (error) {
        console.error("Ошибка получения данных пользователя:", error);
        // Устанавливаем данные по умолчанию
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          status: "ACTIVE",
          avatar: null,
        });
      } else {
        console.log("Получены данные пользователя:", data);
        // Преобразуем данные от API к формату, который ожидает компонент
        setUser({
          firstName: data.firstName || data.name || "",
          lastName: data.lastName || data.lastname || "",
          email: data.email || "",
          status: data.status || "ACTIVE",
          avatar: data.profilePictureUrl || data.photoUrl || null,
        });
      }
    });
  }, []);

  const handlePasswordChange = (passwordData) => {
    console.log("Changing password:", passwordData);
    setShowPasswordModal(false);
    
    // Создаем объект запроса для изменения пароля
    const changePasswordRequest = {
      oldPassword: passwordData.oldPassword,
      newPassword: passwordData.newPassword
    };
    
    userApi.changePassword(changePasswordRequest, (error) => {
      if (error) {
        console.error("Ошибка при изменении пароля:", error);
        setUpdateStatus({
          success: false,
          error: "Не удалось изменить пароль. Проверьте правильность текущего пароля."
        });
      } else {
        setUpdateStatus({
          success: true,
          error: null
        });
        setTimeout(() => setUpdateStatus({ success: false, error: null }), 3000);
      }
    });
  };

  const handleFormSubmit = (formData) => {
    setLoading(true);
    setUpdateStatus({ success: false, error: null });
    
    // Создаем объект запроса для обновления профиля
    const updateRequest = new UpdateUserProfileRequest();
    updateRequest.firstName = formData.firstName;
    updateRequest.lastName = formData.lastName;
    updateRequest.email = formData.email;
    updateRequest.status = formData.status;
    
    // Добавляем фото профиля, если оно есть
    if (uploadedAvatar) {
      // Извлекаем base64 часть из URL данных (удаляем префикс data:image/...;base64,)
      const base64String = uploadedAvatar.split(',')[1];
      updateRequest.profilePictureBase64 = base64String;
    }
    
    // Отправляем запрос на обновление профиля
    userApi.updateProfile(updateRequest, (error, data) => {
      setLoading(false);
      if (error) {
        console.error("Ошибка при обновлении профиля:", error);
        setUpdateStatus({
          success: false,
          error: "Не удалось обновить профиль. Пожалуйста, попробуйте снова."
        });
      } else {
        console.log("Профиль успешно обновлен:", data);
        
        // Обновляем данные пользователя с сервера
        setUser({
          firstName: data.firstName || data.name || "",
          lastName: data.lastName || data.lastname || "",
          email: data.email || "",
          status: data.status || "ACTIVE",
          avatar: data.profilePictureUrl || data.photoUrl || null,
        });
        
        setUpdateStatus({
          success: true,
          error: null
        });
        
        // Скрываем уведомление об успехе через 3 секунды
        setTimeout(() => setUpdateStatus({ success: false, error: null }), 3000);
      }
    });
  };

  // Если данные еще не загрузились, показываем индикатор загрузки
  if (loading && !user.firstName) {
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
        
        {updateStatus.success && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
            Данные успешно сохранены!
          </div>
        )}
        
        {updateStatus.error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
            {updateStatus.error}
          </div>
        )}

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
