import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const InboxCard = ({ unreadCount = 0 }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/notifications");
  };

  return (
    <div className="flex-1 bg-blue-100 border border-blue-200 rounded-xl p-6 animate-fade-in">
      <h2 className="text-4xl md:text-5xl text-blue-900">
        Уведомления <br />
        <strong>{unreadCount}</strong>
      </h2>
      <span
        onClick={handleClick}
        className="cursor-pointer no-underline inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-blue-800 hover:bg-blue-900 transition-transform duration-300 hover:scale-105"
      >
        посмотреть уведомления
      </span>
    </div>
  );
};

InboxCard.propTypes = {
  unreadCount: PropTypes.number
};

export default InboxCard;
