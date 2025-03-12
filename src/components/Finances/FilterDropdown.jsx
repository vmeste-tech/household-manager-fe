import { useState } from "react";
import PropTypes from "prop-types";
import Dropdown from "./Dropdown";

const CustomCheckboxesWithFilters = ({ filters }) => {
  const [dropdowns, setDropdowns] = useState(filters);

  const handleSelectionChange = (filterLabel, selectedValues) => {
    setDropdowns((prev) =>
      prev.map((drop) =>
        drop.label === filterLabel
          ? { ...drop, selected: selectedValues }
          : drop
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Фильтры применены:", dropdowns);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-6xl">
        <div className="flex flex-wrap items-start gap-2 mb-2 justify-start">
          {dropdowns.map((dropdown) => (
            <Dropdown
              key={dropdown.label}
              dropdown={dropdown}
              onSelectionChange={handleSelectionChange}
            />
          ))}
          <button
            type="submit"
            className="w-full md:w-auto inline-flex justify-center font-medium border border-indigo-700 bg-indigo-700 rounded px-8 py-2 text-base text-white hover:bg-indigo-800"
          >
            Применить фильтры
          </button>
        </div>
        <div>
          <div className="flex flex-wrap gap-2">
            {dropdowns.map((dropdown) =>
              dropdown.selected.map((value) => (
                <span
                  key={`${dropdown.label}-${value}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-base bg-indigo-100 text-indigo-800"
                >
                  <span>{value}</span>
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectionChange(
                        dropdown.label,
                        dropdown.selected.filter((i) => i !== value)
                      )
                    }
                    className="ml-2 inline-flex items-center p-0.5 hover:bg-blue-200 rounded-full"
                  >
                    <svg
                      className="h-3 w-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              ))
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

CustomCheckboxesWithFilters.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(PropTypes.string).isRequired,
      selected: PropTypes.arrayOf(PropTypes.string),
      multiple: PropTypes.bool,
    })
  ).isRequired,
};

export default CustomCheckboxesWithFilters;
