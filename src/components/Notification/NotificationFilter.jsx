import PropTypes from "prop-types";
import classNames from "classnames";

const NotificationFilter = ({ filter, onChangeFilter }) => {
  const getButtonClasses = (currentFilter) =>
    classNames(
      "px-4 py-2 rounded-full border cursor-pointer whitespace-nowrap",
      {
        "!border-indigo-600 text-indigo-600": filter === currentFilter,
        "!border-gray-300 text-gray-600": filter !== currentFilter,
      }
    );

  return (
    <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 mb-4">
      <div
        onClick={() => onChangeFilter("all")}
        className={getButtonClasses("all")}
      >
        Все
      </div>
      <div
        onClick={() => onChangeFilter("unread")}
        className={getButtonClasses("unread")}
      >
        Непрочитанные
      </div>
      <div
        onClick={() => onChangeFilter("read")}
        className={getButtonClasses("read")}
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
