import PropTypes from "prop-types";
import { FaUser } from "react-icons/fa";

const TaskCard = ({ task, user, provided }) => (
  <div
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    tabIndex="0"
    className="bg-white p-4 rounded-lg shadow-md transition-transform duration-200 hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500"
  >
    <div className="flex items-center justify-between mb-2">
      <p className="text-lg font-semibold">{task.title}</p>
      {user ? (
        <img
          src={user.avatar}
          alt={user.name}
          className="w-8 h-8 rounded-full"
        />
      ) : (
        <FaUser className="w-8 h-8 text-gray-400" />
      )}
    </div>
    <p className="text-gray-600 mb-2">{task.description}</p>
    <div className="flex justify-between text-sm text-gray-500">
      <span>{new Date(task.scheduledAt).toLocaleString()}</span>
      <span>{user ? user.name : "Не назначено"}</span>
    </div>
  </div>
);

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired, // UUID в виде строки
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.string,
    scheduledAt: PropTypes.string, // ZonedDateTime в виде строки
    apartmentId: PropTypes.string, // UUID в виде строки
    assignedTo: PropTypes.string, // UUID в виде строки
    ruleId: PropTypes.string, // UUID в виде строки
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
  provided: PropTypes.shape({
    innerRef: PropTypes.func.isRequired,
    draggableProps: PropTypes.object.isRequired,
    dragHandleProps: PropTypes.object.isRequired,
  }).isRequired,
};

export default TaskCard;
