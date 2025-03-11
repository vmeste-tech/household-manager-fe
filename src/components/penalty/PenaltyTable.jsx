const violations = [
  {
    id: 1,
    assignedTo: "Jane Doe",
    violation: "Нарушение регламента",
    amount: "100 руб.",
    status: "Оплачен",
  },
  {
    id: 2,
    assignedTo: "John Doe",
    violation: "Просрочка платежа",
    amount: "200 руб.",
    status: "Не оплачен",
  },
];

const PenaltyTable = () => {
  return (
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
            <td className="px-6 py-4 whitespace-nowrap">{item.amount}</td>
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
                className="inline-block px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 cursor-pointer transition duration-150 ease-in-out"
              >
                Оплатить
              </div>
              <div
                role="button"
                tabIndex={0}
                className="inline-block ml-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-50 cursor-pointer transition duration-150 ease-in-out"
              >
                Оспорить
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PenaltyTable;
