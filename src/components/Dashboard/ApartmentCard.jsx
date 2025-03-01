import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ApartmentCard = ({ apartmentName, residentsCount, daysLived }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/apartments");
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white rounded-xl shadow-lg p-6 min-h-[200px] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up flex flex-col"
    >
      {/* Заголовок */}
      <h3 className="text-2xl font-semibold text-gray-800">Квартира</h3>

      {/* Название квартиры по центру */}
      <div className="mt-4 text-2xl font-bold text-blue-800 leading-none text-center">
        {apartmentName}
      </div>

      {/* Пустой блок, чтобы отодвинуть статистику вниз */}
      <div className="flex-grow" />

      {/* Блок со статистикой */}
      <div className="flex justify-around items-center mb-4">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-indigo-800">
            {residentsCount}
          </span>
          <span className="text-xs text-gray-600">жильца в квартире</span>
        </div>
        <div className="flex flex-col items-center border-l border-gray-300 pl-6">
          <span className="text-3xl font-bold text-indigo-800">
            {daysLived}
          </span>
          <span className="text-xs text-gray-600">дней вы живете здесь</span>
        </div>
      </div>
    </div>
  );
};

ApartmentCard.propTypes = {
  apartmentName: PropTypes.string.isRequired,
  residentsCount: PropTypes.number.isRequired,
  daysLived: PropTypes.number.isRequired,
};

export default ApartmentCard;
