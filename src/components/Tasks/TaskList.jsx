import { useState } from "react";
import PropTypes from "prop-types";
import TaskFilters from "./TaskFilters";
import TaskCard from "./TaskCard";

const TaskList = ({ 
  tasks, 
  userFilter, 
  timeFilter, 
  setUserFilter, 
  setTimeFilter,
  loading,
  onStatusChange
}) => {
  const [expandedSections, setExpandedSections] = useState({
    CREATED: true,
    IN_PROGRESS: true,
    COMPLETED: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Group tasks by status
  const groupedTasks = {
    CREATED: tasks.filter(task => task.status === "CREATED"),
    IN_PROGRESS: tasks.filter(task => task.status === "IN_PROGRESS"),
    COMPLETED: tasks.filter(task => task.status === "COMPLETED")
  };

  const statusLabels = {
    CREATED: "Запланировано",
    IN_PROGRESS: "В процессе",
    COMPLETED: "Выполнено"
  };

  const statusIcons = {
    CREATED: (
      <svg className="w-5 h-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
    ),
    IN_PROGRESS: (
      <svg className="w-5 h-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
      </svg>
    ),
    COMPLETED: (
      <svg className="w-5 h-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    )
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold uppercase tracking-wider text-indigo-800 m-0 p-0">
          Список задач
        </div>
      </div>

      <TaskFilters
        userFilter={userFilter}
        setUserFilter={setUserFilter}
        users={[]}  // This would need to be passed from the parent or fetched here
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
      />

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center shadow-sm">
          <p className="text-lg text-gray-600">Нет задач для отображения</p>
          <p className="text-sm text-gray-500 mt-2">Создайте новую задачу или измените параметры фильтра</p>
        </div>
      ) : (
        Object.keys(statusLabels).map(status => (
          <div key={status} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div 
              className="flex items-center justify-between p-4 bg-indigo-50 cursor-pointer border-b border-indigo-100"
              onClick={() => toggleSection(status)}
            >
              <div className="flex items-center space-x-2">
                {statusIcons[status]}
                <div className="font-semibold text-indigo-800">{statusLabels[status]}</div>
                <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs">
                  {groupedTasks[status].length}
                </span>
              </div>
              <svg 
                className={`w-5 h-5 transition-transform ${expandedSections[status] ? 'transform rotate-180' : ''}`} 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>

            {expandedSections[status] && (
              <div className="divide-y divide-gray-100">
                {groupedTasks[status].length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    Нет задач в этой категории
                  </div>
                ) : (
                  groupedTasks[status].map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      onStatusChange={onStatusChange}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  userFilter: PropTypes.string.isRequired,
  timeFilter: PropTypes.string.isRequired,
  setUserFilter: PropTypes.func.isRequired,
  setTimeFilter: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onStatusChange: PropTypes.func.isRequired
};

export default TaskList;
