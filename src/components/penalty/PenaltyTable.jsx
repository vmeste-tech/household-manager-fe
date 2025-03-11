const violations = [
  {
    id: 1,
    assignedTo: "Егор",
    violation: "Нарушение регламента",
    amount: "100",
    status: "Оплачен",
  },
  {
    id: 2,
    assignedTo: "Алексей",
    violation: "Просрочка платежа",
    amount: "200",
    status: "Не оплачен",
  },
];

const PenaltyTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Кому назначен
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Что нарушил
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Размер
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Статус
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Действия
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {violations.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.assignedTo}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.violation}</td>
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
  );
};

export default PenaltyTable;
