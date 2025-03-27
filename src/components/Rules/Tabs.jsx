import PropTypes from "prop-types";

const Tabs = ({ activeFilter, setActiveFilter }) => {
  const filters = ["Все", "На голосовании", "Принятые", "Отклонённые"];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <div
            key={filter}
            onClick={() => setActiveFilter(filter)}
            type="button"
            className={
              activeFilter === filter
                ? "px-4 py-2 rounded-md text-sm font-medium transition-colors bg-indigo-600 text-white shadow-sm"
                : "px-4 py-2 rounded-md text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
            }
          >
            {filter}
          </div>
        ))}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  setActiveFilter: PropTypes.func.isRequired,
};

export default Tabs;
