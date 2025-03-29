import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Pagination from "../Universal/Pagination";
import { financeApi } from "../../api";

// Функция для получения текущего периода в формате YYYYMM
const getCurrentPeriod = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  return parseInt(`${year}${month}`, 10);
};

const DebtsTable = ({ debts }) => {
  // Локальное состояние долгов, чтобы можно было обновлять статус после оплаты
  const [localDebts, setLocalDebts] = useState(debts);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(localDebts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDebts = localDebts.slice(startIndex, startIndex + itemsPerPage);

  // Текущий период в формате YYYYMM
  const currentPeriod = getCurrentPeriod();

  // Обработчик нажатия "Оплатить"
  const handlePayDebt = (debtId) => {
    financeApi.payDebt(debtId, (error, data) => {
      if (error) {
        console.error("Ошибка оплаты:", error);
        // Можно показать уведомление об ошибке пользователю
      } else {
        console.log("Долг оплачен:", data);
        // Обновляем локальное состояние долгов, меняя статус на "PAID"
        setLocalDebts((prevDebts) =>
          prevDebts.map((debt) =>
            debt.id === debtId ? { ...debt, status: "PAID" } : debt
          )
        );
      }
    });
  };

  // Если родительский компонент обновляет список долгов, синхронизируем локальное состояние
  useEffect(() => {
    setLocalDebts(debts);
  }, [debts]);

  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              Кто должен
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              Кому должен
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              Сумма
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
          {currentDebts.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.debtor}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.creditor}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.amount}₽</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.status === "PAID" ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Оплачено
                  </span>
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Не оплачено
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.status !== "PAID" && item.period < currentPeriod && (
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => handlePayDebt(item.id)}
                    className="inline-block px-4 py-2 text-sm font-medium text-indigo-600 border rounded-md hover:bg-indigo-50 cursor-pointer transition duration-150 ease-in-out"
                  >
                    Оплатить
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Пагинация */}
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

DebtsTable.propTypes = {
  debts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      debtor: PropTypes.string.isRequired,
      creditor: PropTypes.string.isRequired,
      amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      status: PropTypes.string.isRequired,
      period: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default DebtsTable;
