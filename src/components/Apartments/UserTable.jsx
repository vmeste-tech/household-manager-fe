import { useState } from "react";
import PropTypes from "prop-types";
import EditUserModal from "../Modal/EditUserModal";

// Mapping between backend enum and frontend display values
const STATUS_MAPPING = {
  // Backend to frontend
  ACTIVE: "Активен",
  AWAY: "В отпуске",
  SICK: "Заболел",
  
  // Frontend to backend
  "Активен": "ACTIVE",
  "В отпуске": "AWAY",
  "Заболел": "SICK",
  "Выселился": null // Note: This status doesn't have a backend equivalent
};

const UsersTable = ({ users, onUserUpdate }) => {
  const [editingUser, setEditingUser] = useState(null);

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  const handleSaveUser = (updatedUser) => {
    onUserUpdate(updatedUser);
    setEditingUser(null);
  };
  
  // Функция для форматирования даты в русском формате
  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU", options);
    } catch (error) {
      console.error("Ошибка при форматировании даты:", error);
      return dateString;
    }
  };

  const getStatusBadge = (status) => {
    const displayStatus = STATUS_MAPPING[status];
    
    switch (displayStatus) {
      case "Активен":
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            {displayStatus}
          </span>
        );
      case "В отпуске":
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
            {displayStatus}
          </span>
        );
      case "Заболел":
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            {displayStatus}
          </span>
        );
      case "Выселился":
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
            {displayStatus}
          </span>
        );
      default:
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
            {displayStatus}
          </span>
        );
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              Фото
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              Имя
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              Фамилия
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              Тип
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              Время присоединения
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              Статус
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              Действия
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={user.photo}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.firstName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.lastName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(user.joinTime)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(user.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div
                  role="button"
                  tabIndex={0}
                  className="inline-block px-4 py-2 text-sm font-medium text-indigo-600 border rounded-md hover:bg-indigo-50 cursor-pointer transition duration-150 ease-in-out"
                  onClick={() => handleEditClick(user)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleEditClick(user);
                    }
                  }}
                >
                  Редактировать
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
};

UsersTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      joinTime: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  onUserUpdate: PropTypes.func,
};

export default UsersTable;
