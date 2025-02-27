import PropTypes from "prop-types";
import { useState } from "react";

const ViolationCard = ({ user, status, date, amount, description }) => {
  const [isOpen, setIsOpen] = useState(false); // Состояние для управления видимостью описания

  const toggleDescription = () => {
    setIsOpen(!isOpen); // Переключение состояния видимости описания
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-6 sm:py-12">
      <div
        className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10 min-w-[300px]"
        onClick={toggleDescription} // При клике открывается описание
      >
        {/* Красный круглый фон, который скрывается при открытом описании */}
        {!isOpen && (
          <span className="absolute top-10 z-0 h-24 w-24 rounded-full bg-red-500 transition-all duration-300 group-hover:scale-[10]"></span>
        )}

        <div className="relative z-10 mx-auto max-w-md flex items-center space-x-6">
          {/* Показываем либо описание, либо стандартную информацию в зависимости от состояния isOpen */}
          {isOpen ? (
            <div className="space-y-4 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90 flex-grow">
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          ) : (
            <>
              {/* Размер штрафа в круглом элементе */}
              <span className="grid h-24 w-24 place-items-center rounded-full bg-red-500 text-white text-lg font-bold transition-all duration-300 group-hover:bg-red-600">
                {amount}
              </span>

              {/* Информация о нарушении */}
              <div className="space-y-4 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90 flex-grow">
                {/* Отображаем user, status и date */}
                <div className="font-medium text-xl text-gray-800">{user}</div>
                <div className="text-sm text-gray-500">{status}</div>
                <div className="text-sm text-gray-500">{date}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

ViolationCard.propTypes = {
  user: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired, // Новое свойство для описания
};

export default ViolationCard;
