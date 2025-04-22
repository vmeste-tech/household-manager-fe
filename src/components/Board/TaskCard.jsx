import PropTypes from "prop-types";

const TaskCard = ({ task, user, provided }) => {
  // Default SVG avatar if no avatar is provided
  const defaultAvatarSvg = (
    <svg
      className="w-8 h-8 rounded-full bg-blue-100 p-1"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
        fill="#6366F1"
      />
      <path
        d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z"
        fill="#6366F1"
      />
    </svg>
  );

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      tabIndex="0"
      className="bg-white p-4 rounded-lg shadow-md transition-transform duration-200 hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500"
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-lg font-semibold">{task.title}</p>
        {user && (
          user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            defaultAvatarSvg
          )
        )}
      </div>
      <p className="text-gray-600 mb-2">{task.description}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{new Date(task.scheduledAt).toLocaleString()}</span>
        <span>{user ? user.name : "Не назначено"}</span>
      </div>
    </div>
  );
};

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
