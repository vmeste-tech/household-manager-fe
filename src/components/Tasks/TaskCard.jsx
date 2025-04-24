import PropTypes from "prop-types";
import { useState } from "react";

const TaskCard = ({ task, onStatusChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const statusOptions = {
    CREATED: "Запланировано",
    IN_PROGRESS: "В процессе",
    COMPLETED: "Выполнено",
    CANCELED: "Отменено"
  };

  const statusColors = {
    CREATED: "bg-blue-100 text-blue-800",
    IN_PROGRESS: "bg-yellow-100 text-yellow-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELED: "bg-gray-100 text-gray-800"
  };

  // Дефолтная SVG для аватара
  const defaultAvatarSvg = (
    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
      <svg className="w-5 h-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
    </div>
  );

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  const handleStatusChange = (newStatus) => {
    onStatusChange(task.id, newStatus);
    setShowStatusMenu(false);
  };

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-start justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 flex-grow">
          <div 
            className="cursor-pointer flex items-center space-x-2" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <svg className={`w-5 h-5 text-indigo-500 transition-transform ${isExpanded ? 'transform rotate-90' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <h3 className="font-medium text-gray-900">{task.title}</h3>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{formatDate(task.scheduledAt)}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[task.status]}`}>
            {statusOptions[task.status]}
          </span>
          
          <div className="relative">
            <button 
              className="p-1 rounded-full hover:bg-gray-200"
              onClick={() => setShowStatusMenu(!showStatusMenu)}
            >
              <svg className="w-5 h-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
            
            {showStatusMenu && (
              <div className="absolute right-0 z-10 mt-1 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  {Object.keys(statusOptions).map(status => (
                    <button
                      key={status}
                      className={`block px-4 py-2 text-sm text-left w-full ${status === task.status ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => handleStatusChange(status)}
                    >
                      {statusOptions[status]}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="mt-4 pl-7">
          <div className="bg-gray-50 p-4 rounded-lg">
            {task.description ? (
              <p className="text-gray-700">{task.description}</p>
            ) : (
              <p className="text-gray-500 italic">Описание отсутствует</p>
            )}
            
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <div className="flex items-center">
                  {task.assignedUserInfo?.avatar ? (
                    <img 
                      src={task.assignedUserInfo.avatar} 
                      alt={task.assignedUserInfo.name}
                      className="w-8 h-8 rounded-full object-cover mr-2" 
                    />
                  ) : (
                    <div className="mr-2">{defaultAvatarSvg}</div>
                  )}
                  <span className="font-medium">{task.assignedUserInfo?.name || 'Не назначено'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.string.isRequired,
    scheduledAt: PropTypes.string.isRequired,
    assignedTo: PropTypes.string,
    ruleId: PropTypes.string,
    assignedUserInfo: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string
    })
  }).isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default TaskCard;
