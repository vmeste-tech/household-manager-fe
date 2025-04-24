import PropTypes from "prop-types";

const TaskFilters = ({ 
  userFilter, 
  setUserFilter,
  users,
  timeFilter,
  setTimeFilter 
}) => {
  const timePeriods = [
    { id: "today", name: "Сегодня" },
    { id: "week", name: "Неделя" },
    { id: "month", name: "Месяц" }
  ];

  // Функция для обработки изменения фильтра пользователей
  const handleUserFilterChange = (e) => {
    const newValue = e.target.value;
    console.log("Изменение фильтра пользователей на:", newValue);
    setUserFilter(newValue);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-lg p-3 shadow-sm">
      <div className="flex items-center bg-white rounded-md overflow-hidden shadow-sm border border-indigo-200">
        {timePeriods.map((period, index) => (
          <div
            key={period.id}
            onClick={() => setTimeFilter(period.id)}
            className={`
              px-4 py-2 text-sm transition-colors cursor-pointer flex items-center justify-center w-24
              ${index !== 0 ? "border-l border-indigo-100" : ""}
              ${timeFilter === period.id
                ? "bg-indigo-100 text-indigo-800 font-medium"
                : "text-gray-600 hover:bg-gray-50"}
            `}
          >
            {period.name}
          </div>
        ))}
      </div>
      
      <div className="relative group">
        <select
          className="appearance-none bg-white border-2 border-indigo-300 rounded-md py-2 pl-10 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500 transition-all group-hover:border-indigo-500"
          value={userFilter}
          onChange={handleUserFilterChange}
        >
          <option value="all">Все пользователи</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.firstName} {user.lastName}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
          <div className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-indigo-600">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

TaskFilters.propTypes = {
  userFilter: PropTypes.string.isRequired,
  setUserFilter: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    })
  ).isRequired,
  timeFilter: PropTypes.string.isRequired,
  setTimeFilter: PropTypes.func.isRequired
};

export default TaskFilters;
