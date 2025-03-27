import { useState, useEffect } from "react";
import CustomButton from "../Universal/CustomButton";
import FileDropZone from "../Universal/FileDropZone";
import Modal from "../Universal/Modal";

import DefaultApi from "../../generated-client-js/src/api/DefaultApi";
import userApiClient from "../../api/setupUserApi";

export default function AccountSettings() {
  const [showFileDropZone, setShowFileDropZone] = useState(false);
  const [user, setUser] = useState(null); // изначально нет данных
  const [loading, setLoading] = useState(true); // состояние загрузки

  useEffect(() => {
    const defaultApi = new DefaultApi(userApiClient);

    defaultApi.getUser((error, data) => {
      setLoading(false);
      if (error) {
        console.error("Ошибка получения данных пользователя:", error);
      } else {
        console.log("Получены данные пользователя:", data);
        setUser(data);
      }
    });
  }, []);

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
      {showFileDropZone && (
        <Modal onClose={() => setShowFileDropZone(false)}>
          <FileDropZone />
          <div className="flex justify-end mt-4">
            <CustomButton
              text="Закрыть"
              variant="outlined"
              onClick={() => setShowFileDropZone(false)}
            />
          </div>
        </Modal>
      )}

      <div className="p-8 bg-white rounded-xl">
        <div className="text-2xl font-bold mb-6">Настройки</div>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <img
            src="https://i.pinimg.com/736x/bd/d9/aa/bdd9aaee8c129b1d0a7180512c6f7ae5.jpg"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <CustomButton
            text="Загрузить"
            variant="filled"
            onClick={() => setShowFileDropZone(true)}
          />
          <CustomButton
            text="Удалить"
            variant="outlined"
            onClick={() => console.log("Удаление файла")}
          />
        </div>

        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Имя */}
            <div>
              <label
                htmlFor="firstName"
                className="block mb-1 text-xs font-medium uppercase tracking-wider"
              >
                ИМЯ
              </label>
              <input
                id="firstName"
                type="text"
                defaultValue={user.firstName}
                placeholder="Введите имя"
                className="w-full px-3 py-2 border rounded !border-gray-300 focus:outline-none focus:!border-indigo-600"
              />
            </div>

            {/* Фамилия */}
            <div>
              <label
                htmlFor="lastName"
                className="block mb-1 text-xs font-medium uppercase tracking-wider"
              >
                ФАМИЛИЯ
              </label>
              <input
                id="lastName"
                type="text"
                defaultValue={user.lastName}
                placeholder="Введите фамилию"
                className="w-full px-3 py-2 border rounded !border-gray-300 focus:outline-none focus:!border-indigo-600"
              />
            </div>

            {/* Электронная почта */}
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-xs font-medium uppercase tracking-wider"
              >
                ЭЛЕКТРОННАЯ ПОЧТА
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center">
                  @
                </span>
                <input
                  id="email"
                  type="email"
                  defaultValue={user.email}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 border rounded !border-gray-300 focus:outline-none focus:!border-indigo-600"
                />
              </div>
            </div>

            {/* Статус */}
            <div>
              <label
                htmlFor="status"
                className="block mb-1 text-xs font-medium uppercase tracking-wider"
              >
                СТАТУС
              </label>
              <select
                id="status"
                defaultValue={user.status}
                className="w-full px-3 py-2 border rounded !border-gray-300 focus:outline-none focus:!border-indigo-600"
              >
                <option>Активен</option>
                <option>В отпуске</option>
                <option>Заболел</option>
              </select>
            </div>

            {/* Изменение пароля */}
            <div className="md:col-span-2">
              <label className="block mb-1 text-xs font-medium uppercase tracking-wider">
                ИЗМЕНЕНИЕ ПАРОЛЯ
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="password"
                  placeholder="Старый пароль"
                  className="w-full px-3 py-2 border rounded !border-gray-300 focus:outline-none focus:!border-indigo-600"
                />
                <input
                  type="password"
                  placeholder="Новый пароль"
                  className="w-full px-3 py-2 border rounded !border-gray-300 focus:outline-none focus:!border-indigo-600"
                />
                <input
                  type="password"
                  placeholder="Повторить пароль"
                  className="w-full px-3 py-2 border rounded !border-gray-300 focus:outline-none focus:!border-indigo-600"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <CustomButton
              text="Сохранить"
              variant="filled"
              onClick={() => console.log("Сохранение данных")}
            />
          </div>
        </form>
      </div>
    </>
  );
}
