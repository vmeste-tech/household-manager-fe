import PropTypes from "prop-types";

const ProgressTable = ({ userData }) => {
  // Преобразуем объект userData в массив для удобства отображения
  const users = Object.keys(userData);

  return (
    <div className="block w-full overflow-x-auto max-w-xl rounded-xl bg-white">
      <table className="min-w-full table-fixed border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-3 text-gray-700 text-xs font-semibold text-left uppercase">
              Пользователь
            </th>
            <th className="px-4 py-3 text-gray-700 text-xs font-semibold text-left uppercase">
              Потратил
            </th>
            <th className="px-4 py-3 text-gray-700 text-xs font-semibold text-left uppercase">
              Штрафы
            </th>
            <th className="px-4 py-3 text-gray-700 text-xs font-semibold text-left uppercase">
              Соотношение
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((user, index) => {
            const { expenses, fines } = userData[user];
            const total = expenses + fines;
            const amountPercent = total ? (expenses / total) * 100 : 0;
            const finesPercent = total ? (fines / total) * 100 : 0;

            return (
              <tr className="text-gray-500" key={index}>
                <td className="border-t px-4 py-4 align-middle text-sm font-normal whitespace-nowrap">
                  {user}
                </td>
                <td className="border-t px-4 py-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap">
                  {expenses}
                </td>
                <td className="border-t px-4 py-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap">
                  {fines}
                </td>
                <td className="border-t px-4 py-4 align-middle text-xs whitespace-nowrap">
                  <div className="relative w-full h-4 bg-gray-200 rounded-sm">
                    {/* Сегмент для потраченной суммы */}
                    <div
                      className="absolute left-0 h-4 rounded-l-sm"
                      style={{
                        width: `${amountPercent}%`,
                        backgroundColor: "rgba(54, 162, 235, 0.2)",
                      }}
                    ></div>
                    {/* Сегмент для штрафов */}
                    <div
                      className="absolute h-4 rounded-r-sm"
                      style={{
                        width: `${finesPercent}%`,
                        left: `${amountPercent}%`,
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>{amountPercent.toFixed(0)}%</span>
                    <span>{finesPercent.toFixed(0)}%</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

ProgressTable.propTypes = {
  userData: PropTypes.objectOf(
    PropTypes.shape({
      expenses: PropTypes.number.isRequired,
      fines: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ProgressTable;
