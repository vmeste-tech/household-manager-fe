import PropTypes from "prop-types";
import { FaFilter } from "react-icons/fa";

const Filter = ({ filter, onChange, users }) => (
  <div className="relative">
    <select
      className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      value={filter}
      onChange={onChange}
      aria-label="Фильтр задач по пользователю"
    >
      <option value="all">Все пользователи</option>
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <FaFilter className="h-4 w-4" aria-hidden="true" />
    </div>
  </div>
);

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    })
  ).isRequired,
};

export default Filter;
