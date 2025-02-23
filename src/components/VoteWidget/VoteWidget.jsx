import { useState } from "react";
import PropTypes from "prop-types";
import "./VoteWidget.css";

/*
  VoteWidget — универсальный компонент голосования.

  Пропсы:
    - title: Заголовок голосования (например, "Голосование за правило")
    - options: Массив объектов, каждый из которых описывает опцию голосования.
      Каждый объект должен содержать:
        • label: отображаемое название опции (например, "За", "Против")
        • value: уникальное значение для этой опции (например, "for", "against")
    - onVote: Callback-функция, которая вызывается при голосовании.
      При голосовании в неё передаётся value выбранной опции.
*/
function VoteWidget({ title, options, onVote }) {
  // Локальное состояние для накопления голосов (для демонстрации)
  const [votes, setVotes] = useState(
    options.reduce((acc, option) => {
      acc[option.value] = 0;
      return acc;
    }, {})
  );

  const handleVote = (value) => {
    // Обновляем локальное состояние голосов
    setVotes((prev) => ({
      ...prev,
      [value]: prev[value] + 1,
    }));
    // Вызываем callback, если он передан
    if (onVote) {
      onVote(value);
    }
  };

  return (
    <div className="vote-widget">
      <h3 className="vote-title">{title}</h3>
      <div className="vote-options">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleVote(option.value)}
            className="vote-button"
          >
            {option.label}{" "}
            <span className="vote-count">({votes[option.value]})</span>
          </button>
        ))}
      </div>
    </div>
  );
}

VoteWidget.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  onVote: PropTypes.func,
};

export default VoteWidget;
