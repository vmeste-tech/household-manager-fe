import PropTypes from "prop-types";
import { useState } from "react";

const ViolationCard = ({ user, status, date, amount, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDescription = () => {
    setIsOpen(!isOpen);
  };

  return (
    // Убираем min-h-screen и уменьшаем вертикальные отступы
    <div className="relative flex flex-col overflow-hidden py-1">
      <div
        className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-6 pb-6 ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 
                    sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-8 min-w-[200px] w-full"
        onClick={toggleDescription}
      >
        {/* Красный круглый фон, который скрывается при открытом описании */}
        {!isOpen && (
          <span className="absolute top-6 z-0 h-24 w-24 rounded-full bg-red-500 transition-all duration-300 group-hover:scale-[10]" />
        )}

        <div className="relative z-10 mx-auto max-w-md flex items-center space-x-6">
          {isOpen ? (
            <div className="space-y-4 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90 flex-grow">
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          ) : (
            <>
              {/* Круг с суммой штрафа */}
              <span className="grid h-24 w-24 place-items-center rounded-full bg-red-500 text-white text-lg font-bold transition-all duration-300 group-hover:bg-red-600">
                {amount}
              </span>

              {/* Основная информация о нарушении */}
              <div className="space-y-2 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90 flex-grow">
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
  description: PropTypes.string.isRequired,
};

export default ViolationCard;
