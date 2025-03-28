import PropTypes from "prop-types";

const NotificationFilter = ({ filter, onChangeFilter }) => {
  return (
    <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 mb-4">
      <div
        onClick={() => onChangeFilter("all")}
        className={`px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 ${
          filter === "all"
            ? "bg-indigo-100 text-indigo-700 font-medium"
            : "bg-white text-gray-600 hover:bg-gray-50"
        }`}
      >
        Все
      </div>
      <div
        onClick={() => onChangeFilter("unread")}
        className={`px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 ${
          filter === "unread"
            ? "bg-indigo-100 text-indigo-700 font-medium"
            : "bg-white text-gray-600 hover:bg-gray-50"
        }`}
      >
        Непрочитанные
      </div>
      <div
        onClick={() => onChangeFilter("read")}
        className={`px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 ${
          filter === "read"
            ? "bg-indigo-100 text-indigo-700 font-medium"
            : "bg-white text-gray-600 hover:bg-gray-50"
        }`}
      >
        Прочитанные
      </div>
    </div>
  );
};

NotificationFilter.propTypes = {
  filter: PropTypes.oneOf(["all", "unread", "read"]).isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default NotificationFilter;
