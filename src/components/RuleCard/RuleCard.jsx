import { useState } from "react";
import PropTypes from "prop-types";
import {
  FaCalendarAlt, // иконка для частоты
  FaMoneyBillAlt, // иконка для штрафа
  FaInfoCircle, // иконка для статуса
  FaCheck, // иконка для "За"
  FaTimes, // иконка для "Против"
} from "react-icons/fa";
import "./RuleCard.css";

/**
 * Карточка правила
 */
function RuleCard({ title, frequency, fine, status, votingActive, onVote }) {
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (vote) => {
    if (onVote) {
      onVote(vote);
    }
    setHasVoted(true);
  };

  // Преобразуем статус в lowercase, чтобы удобнее навешивать классы
  const normalizedStatus = status.toLowerCase();

  // Собираем классы карточки
  let cardClasses = "rule-card";

  // Добавим класс статуса (для цветной рамки)
  if (["accepted", "принято"].includes(normalizedStatus)) {
    cardClasses += " accepted";
  } else if (["rejected", "отклонено"].includes(normalizedStatus)) {
    cardClasses += " rejected";
  } else if (["pending", "ожидается"].includes(normalizedStatus)) {
    cardClasses += " pending";
  }

  // Если пользователь проголосовал — меняем цвет рамки
  if (hasVoted) {
    cardClasses += " voted";
  }

  return (
    <div className={cardClasses}>
      {/* Название правила */}
      <div className="rule-column rule-title">{title}</div>

      {/* Частота с иконкой */}
      <div className="rule-column rule-frequency">
        <FaCalendarAlt className="icon" />
        <span>{frequency}</span>
      </div>

      {/* Штраф с иконкой */}
      <div className="rule-column rule-fine">
        <FaMoneyBillAlt className="icon" />
        <span>{fine}</span>
      </div>

      {/* Статус с иконкой (и цветным бейджем) */}
      <div className={`rule-column rule-status ${normalizedStatus}`}>
        <FaInfoCircle className="icon" />
        <span>{status}</span>
      </div>

      {/* Блок голосования, если активно и пользователь ещё не проголосовал */}
      {votingActive && !hasVoted && (
        <div className="rule-column rule-voting">
          <button onClick={() => handleVote("За")}>
            <FaCheck className="icon" /> За
          </button>
          <button onClick={() => handleVote("Против")}>
            <FaTimes className="icon" /> Против
          </button>
        </div>
      )}
    </div>
  );
}

RuleCard.propTypes = {
  /** Название правила */
  title: PropTypes.string.isRequired,
  /** Частота (например, "ежедневно", "еженедельно" и т.д.) */
  frequency: PropTypes.string.isRequired,
  /** Штраф за нарушение */
  fine: PropTypes.string.isRequired,
  /** Статус (например, "accepted"/"принято", "rejected"/"отклонено", "pending"/"ожидается") */
  status: PropTypes.string.isRequired,
  /** Активно ли голосование */
  votingActive: PropTypes.bool,
  /** Callback-функция, вызываемая при голосовании */
  onVote: PropTypes.func,
};

RuleCard.defaultProps = {
  votingActive: false,
  onVote: null,
};

export default RuleCard;
