// src/components/TaskCard.jsx
import PropTypes from "prop-types";
import "./TaskCard.css";

function TaskCard({ task }) {
  const { title, executor, due, status } = task;

  return (
    <div className="task-card">
      <h2>{title}</h2>
      <p>Исполнитель: {executor}</p>
      <p>Срок: {due}</p>
      <p>Статус: {status}</p>
      <div className="task-card-buttons">
        <button>Рабочую</button>
        <button>Подробнее</button>
      </div>
    </div>
  );
}

// Добавляем propTypes
TaskCard.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    executor: PropTypes.string.isRequired,
    due: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskCard;
