import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const Dropdown = ({ dropdown, onSelectionChange }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(dropdown.selected || []);
  const searchInputRef = useRef(null);

  // Синхронизируем локальное состояние с изменениями из родителя
  useEffect(() => {
    setSelected(dropdown.selected || []);
  }, [dropdown.selected]);

  useEffect(() => {
    if (open && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [open]);

  // Фильтруем элементы, предполагая, что item — это строка
  const filteredItems = dropdown.items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  const toggleOpen = () => setOpen((prev) => !prev);

  const handleItemClick = (item) => {
    let newSelected;
    if (dropdown.multiple === false) {
      // Если выбранный элемент уже активен, снимаем выбор, иначе выбираем новый
      newSelected = selected.includes(item) ? [] : [item];
    } else {
      if (selected.includes(item)) {
        newSelected = selected.filter((i) => i !== item);
      } else {
        newSelected = [...selected, item];
      }
    }
    setSelected(newSelected);
    // Используем dropdown.label как идентификатор
    onSelectionChange(dropdown.label, newSelected);
  };

  const selectedLabel =
    selected.length === 0
      ? dropdown.label
      : `${dropdown.label}: ${selected.length}`;

  return (
    <div className="relative w-full md:w-auto">
      {selected.map((value) => (
        <input
          key={value}
          type="hidden"
          name={`${dropdown.label}[]`}
          value={value}
        />
      ))}
      <button
        type="button"
        onClick={toggleOpen}
        className="inline-flex justify-between w-full bg-white rounded md:w-48 px-2 py-2 text-base text-stone-500 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
      >
        <span className="truncate mx-2">{selectedLabel}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 flex-shrink-0"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          className="absolute z-10 w-full mt-2 rounded bg-white ring-2 ring-indigo-200 border border-indigo-500"
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
          }}
          tabIndex="-1"
        >
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              ref={searchInputRef}
              placeholder={`Search for ${dropdown.label.toLowerCase()}`}
              className="block w-full px-4 py-2 text-gray-800 rounded-t border-b focus:outline-none"
            />
            {search.length > 0 && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-2 px-2 flex items-center"
              >
                <svg
                  className="h-4 w-4 text-gray-400 hover:text-indigo-600"
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
            )}
          </div>

          <div className="rounded-b max-h-60 overflow-y-auto">
            {filteredItems.map((item) => (
              <div
                key={item}
                onClick={() => handleItemClick(item)}
                className={`block px-4 py-2 text-gray-700 hover:bg-indigo-200 hover:text-indigo-500 cursor-pointer bg-white ${
                  selected.includes(item) ? "bg-indigo-200" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(item)}
                    readOnly
                    className="w-4 h-4 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                  />
                  <span className="truncate">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  dropdown: PropTypes.shape({
    label: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    selected: PropTypes.arrayOf(PropTypes.string),
    multiple: PropTypes.bool,
  }).isRequired,
  onSelectionChange: PropTypes.func.isRequired,
};

export default Dropdown;
