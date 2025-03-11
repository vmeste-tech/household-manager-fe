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
                ? "bg-indigo-800 text-white rounded-lg"
                : "hover:text-indigo-700"
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
