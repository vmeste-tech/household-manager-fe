import { useState } from "react";
import PropTypes from "prop-types";
import Pagination from "../Universal/Pagination";

const PurchaseTables = ({ expenses, initialItemsToShow = 6 }) => {
  const itemsPerPage = initialItemsToShow;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(expenses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedExpenses = expenses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                Статья затрат
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                Описание
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedExpenses.map((expense) => (
              <tr key={expense.id}>
                <td className="px-6 py-4 whitespace-nowrap">{expense.item}</td>
                <td className="px-6 py-4 max-w-md truncate">
                  {expense.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="inline-block cursor-pointer px-4 py-2 text-sm font-medium text-indigo-600 border rounded-md hover:bg-indigo-50 transition duration-150 ease-in-out">
                    Внести затрату
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="mt-2 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

PurchaseTables.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      item: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  initialItemsToShow: PropTypes.number,
};

export default PurchaseTables;
