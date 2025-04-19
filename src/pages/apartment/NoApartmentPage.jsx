import { useState } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import CustomButton from "../../components/Universal/CustomButton";
import Modal from "../../components/Universal/Modal";
import Heading from "../../components/Universal/Heading";
import { userApi } from "../../api";
import UseInviteCodeRequest from "../../generated-client-js/src/model/UseInviteCodeRequest";
import PropTypes from "prop-types";

function NoApartmentPage({ setHasApartment }) {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [apartmentName, setApartmentName] = useState("");
  const [apartmentAddress, setApartmentAddress] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Для 6-клеточного ввода кода
  const [codeDigits, setCodeDigits] = useState(["", "", "", "", "", ""]);

  // Фокусировка на следующем input при вводе
  const handleCodeInput = (e, idx) => {
    const val = e.target.value.replace(/[^0-9A-Za-z]/g, "").toUpperCase();
    if (val.length > 1) return;
    const newDigits = [...codeDigits];
    newDigits[idx] = val;
    setCodeDigits(newDigits);

    // Автоматический переход к следующему input
    if (val && idx < 5) {
      document.getElementById(`code-input-${idx + 1}`)?.focus();
    }
  };

  // Backspace: переход к предыдущему input
  const handleCodeKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !codeDigits[idx] && idx > 0) {
      document.getElementById(`code-input-${idx - 1}`)?.focus();
    }
  };

  // Собираем код из клеточек
  const accessCode = codeDigits.join("");

  const handleJoinApartment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Создаем объект запроса
      const request = new UseInviteCodeRequest();
      request.code = accessCode;
      
      // Вызываем API для использования кода приглашения
      const joinPromise = new Promise((resolve, reject) => {
        userApi.useInviteCode(
          request,
          (error, data) => {
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
          }
        );
      });
      
      const data = await joinPromise;
      
      // Сохраняем ID квартиры в localStorage
      if (data && data.apartmentId) {
        localStorage.setItem("apartmentId", data.apartmentId);
        // Update the parent component state
        if (setHasApartment) setHasApartment(true);
      }
      
      // Обновляем страницу после успешного присоединения
      window.location.reload();
    } catch (err) {
      console.error("Ошибка при присоединении к квартире:", err);
      setError("Некорректный код приглашения или он уже был использован");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateApartment = async (e) => {
    console.info("Creating apartment with name:", apartmentName);
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!apartmentName || !apartmentAddress) {
      setError("Пожалуйста, заполните все поля");
      setIsLoading(false);
      return;
    }

    try {
      const createPromise = new Promise((resolve, reject) => {
        userApi.createApartment(
          { 
            name: apartmentName, 
            address: apartmentAddress 
          },
          (error, data) => {
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
          }
        );
      });
      
      const data = await createPromise;
      
      // Store the apartment ID in localStorage
      localStorage.setItem("apartmentId", data.apartmentId);
      // Update the parent component state
      if (setHasApartment) setHasApartment(true);
      
      // После успешного создания
      window.location.reload();
    } catch (err) {
      console.error("Ошибка при создании квартиры:", err);
      setError("Ошибка при создании квартиры. Пожалуйста, попробуйте еще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader />
      <div className="pt-20 max-w-7xl mx-auto flex flex-col items-center gap-8 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl animate-fade-in">
          <div className="text-center mb-6">
            <Heading>Управление домашними обязанностями</Heading>
          </div>

          <p className="text-gray-600 mb-8 text-center">
            Похоже, вы еще не присоединились ни к одной квартире. Вы можете
            присоединиться к существующей квартире с помощью кода доступа или
            создать новую.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 rounded-lg p-6 flex flex-col items-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-indigo-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                  />
                </svg>
              </div>
              <div
                className="text-xl text-center font-semibold text-gray-800 mb-2"
                role="heading"
                aria-level="2"
              >
                Присоединиться к квартире
              </div>
              <p className="text-gray-600 text-center mb-4">
                Используйте код доступа, полученный от соседей
              </p>
              <CustomButton
                text="Ввести код"
                onClick={() => setIsJoinModalOpen(true)}
                variant="filled"
              />
            </div>

            <div className="bg-indigo-50 rounded-lg p-6 flex flex-col items-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-indigo-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </div>
              <div
                className="text-xl text-center font-semibold text-gray-800 mb-2"
                role="heading"
                aria-level="2"
              >
                Создать новую квартиру
              </div>
              <p className="text-gray-600 text-center mb-4">
                Создайте новую квартиру и пригласите соседей
              </p>
              <CustomButton
                text="Создать квартиру"
                onClick={() => setIsCreateModalOpen(true)}
                variant="filled"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно для ввода кода доступа */}
      {isJoinModalOpen && (
        <Modal onClose={() => setIsJoinModalOpen(false)}>
          <Heading>Присоединиться к квартире</Heading>
          <form onSubmit={handleJoinApartment} className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="accessCode"
                className="block text-sm font-medium text-gray-700"
              >
                Код доступа
              </label>
              <div className="flex gap-2 justify-center mt-2">
                {codeDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`code-input-${idx}`}
                    type="text"
                    inputMode="text"
                    maxLength={1}
                    autoFocus={idx === 0}
                    value={digit}
                    onChange={(e) => handleCodeInput(e, idx)}
                    onKeyDown={(e) => handleCodeKeyDown(e, idx)}
                    className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                  />
                ))}
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-end space-x-2">
              <CustomButton
                text="Отмена"
                onClick={() => setIsJoinModalOpen(false)}
                variant="outlined"
              />
              <CustomButton
                text={isLoading ? "Присоединение..." : "Присоединиться"}
                type="submit"
                onClick={handleJoinApartment}
                disabled={isLoading || accessCode.length !== 6}
              />
            </div>
          </form>
        </Modal>
      )}

      {/* Модальное окно для создания квартиры */}
      {isCreateModalOpen && (
        <Modal onClose={() => setIsCreateModalOpen(false)}>
          <Heading>Создать новую квартиру</Heading>
          <form onSubmit={handleCreateApartment} className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="apartmentName"
                className="block text-sm font-medium text-gray-700"
              >
                Название квартиры
              </label>
              <input
                id="apartmentName"
                type="text"
                value={apartmentName}
                onChange={(e) => setApartmentName(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="Например: Квартира на Ленина"
              />
            </div>

            <div>
              <label
                htmlFor="apartmentAddress"
                className="block text-sm font-medium text-gray-700"
              >
                Адрес
              </label>
              <input
                id="apartmentAddress"
                type="text"
                value={apartmentAddress}
                onChange={(e) => setApartmentAddress(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="Например: ул. Ленина, 10, кв. 25"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-end space-x-2">
              <CustomButton
                text="Отмена"
                onClick={() => setIsCreateModalOpen(false)}
                variant="outlined"
              />
              <CustomButton
                text={isLoading ? "Создание..." : "Создать"}
                onClick={handleCreateApartment}
                disabled={isLoading || !apartmentName || !apartmentAddress}
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

NoApartmentPage.propTypes = {
  setHasApartment: PropTypes.func
};

NoApartmentPage.defaultProps = {
  setHasApartment: () => {}
};

export default NoApartmentPage;
