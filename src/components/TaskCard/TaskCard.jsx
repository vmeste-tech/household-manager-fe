import PropTypes from "prop-types";
import "./TaskCard.css";

/*
  Компонент TaskCard:
    - title: Название задачи
    - executor: Исполнитель задачи
    - deadline: Срок выполнения
    - status: Текущий статус задачи
    - onCardClick: Обработчик клика по всей карточке
    - onWorkClick: Обработчик клика по кнопке "В работу"
    - onDetailsClick: Обработчик клика по кнопке "Подробнее"

  Ключевой момент:
    - При клике по кнопкам останавливаем всплытие (e.stopPropagation()),
      чтобы не вызывался onCardClick для всей карточки.
*/

const TaskCard = ({ title, executor, deadline, status, onCardClick }) => {
  return (
    <div className="task-card" onClick={onCardClick}>
      <h3 className="task-card__title">{title}</h3>
      <p className="task-card__info">Исполнитель: {executor}</p>
      <p className="task-card__info">Срок: {deadline}</p>
      <p className="task-card__info">Статус: {status}</p>
    </div>
  );
};

TaskCard.propTypes = {
  title: PropTypes.string.isRequired,
  executor: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onCardClick: PropTypes.func,
};

TaskCard.defaultProps = {
  onCardClick: () => {},
};

export default TaskCard;
