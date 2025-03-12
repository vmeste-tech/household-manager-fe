const debts = [
  {
    id: 1,
    debtor: "Анна",
    creditor: "Максим",
    amount: "1500",
    status: "Задолженность",
  },
  {
    id: 2,
    debtor: "Илья",
    creditor: "Общий котел",
    amount: "800",
    status: "Погашено",
  },
];

const DebtsTable = () => {
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
          {debts.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.debtor}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.creditor}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.amount}₽</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.status === "Погашено" ? (
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
                  Оплатить
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DebtsTable;
