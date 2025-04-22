import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const RulesCard = ({ activeRules = 0, votingRules = 0 }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/rules");
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up flex flex-col">
        {/* Заголовок карточки */}
        <h3 className="text-xl font-bold text-indigo-800">Правила</h3>

        {/* Секции с цифрами и описанием */}
        <div className="flex mt-8 justify-around">
          {/* Секция активных правил */}
          <div className="flex items-center">
            <div className="text-5xl font-bold text-indigo-800">
              {activeRules}
            </div>
            <div className="ml-3 flex flex-col">
              <span className="text-sm text-gray-600">активных</span>
              <span className="text-sm text-gray-600">правила</span>
            </div>
          </div>

          {/* Секция правил на голосовании */}
          <div className="flex items-center">
            <div className="text-5xl font-bold text-indigo-800">
              {votingRules}
            </div>
            <div className="ml-3 flex flex-col">
              <span className="text-sm text-gray-600">на</span>
              <span className="text-sm text-gray-600">голосовании</span>
            </div>
          </div>
        </div>

        {/* Мотивационное сообщение, прижатое к нижнему краю карточки */}
        <div className="mt-auto text-center text-sm text-gray-500">
          Следуйте правилам – вместе мы сделаем наш дом местом, где приятно
          каждому!
        </div>
      </div>
      {/* Невидимая кнопка, перекрывающая всю карточку */}
      <button
        onClick={handleClick}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  );
};

RulesCard.propTypes = {
  activeRules: PropTypes.number,
  votingRules: PropTypes.number
};

export default RulesCard;
