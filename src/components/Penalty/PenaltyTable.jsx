import PropTypes from "prop-types";
import { useState } from "react";
import Pagination from "../Universal/Pagination";

const transformPenalties = (backendData) => {
  return backendData.map((item) => ({
    id: item.id,
    assignedTo: `${item.user.name} ${item.user.lastname}`,
    violation: item.rule.name,
    date: new Date(item.assignedDate).toLocaleDateString("ru-RU"),
    amount: item.fineAmount || "0",
    status: item.status === "UNPAID" ? "Не оплачен" : "Оплачен",
  }));
};

const PenaltyTable = ({ penalties }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Преобразуем данные с помощью функции transformPenalties
  const transformedPenalties = transformPenalties(penalties);
  const totalPages = Math.ceil(transformedPenalties.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentViolations = transformedPenalties.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div>
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                Кому назначен
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                Что нарушил
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                Дата нарушения
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                Размер
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
            {currentViolations.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.assignedTo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.violation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.amount}₽</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.status === "Оплачен" ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {item.status}
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      {item.status}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    role="button"
                    tabIndex={0}
                    className="inline-block px-4 py-2 text-sm font-medium text-indigo-600 border rounded-md hover:bg-indigo-50 cursor-pointer transition duration-150 ease-in-out"
                  >
                    Оспорить
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

// Типизация пропсов с использованием PropTypes
PenaltyTable.propTypes = {
  penalties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        photoUrl: PropTypes.string,
        type: PropTypes.string.isRequired,
        joinedAt: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.instanceOf(Date),
        ]).isRequired,
        status: PropTypes.string.isRequired,
      }).isRequired,
      rule: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        penaltyAmount: PropTypes.number.isRequired,
        cronExpression: PropTypes.string.isRequired,
        timeZone: PropTypes.string.isRequired,
      }).isRequired,
      fineAmount: PropTypes.number.isRequired,
      assignedDate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
      ]).isRequired,

      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PenaltyTable;
