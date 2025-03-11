import PropTypes from "prop-types";

const Tabs = ({ activeFilter, setActiveFilter }) => {
  const filters = ["Все", "На голосовании", "Принятые", "Отклонённые"];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-evenly border rounded-md overflow-hidden">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex-1 px-2 py-1 transition-colors text-center ${
              activeFilter === filter
                ? "bg-blue-600 text-white rounded-lg"
                : "hover:text-blue-600"
            }`}
          >
            {filter}
          </button>
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
