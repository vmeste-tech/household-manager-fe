import { useState } from "react";
import Pagination from "../Universal/Pagination";

const violations = [
  {
    id: 1,
    assignedTo: "Егор",
    violation: "Нарушение регламента",
    date: "12.03.2025",
    amount: "100",
    status: "Оплачен",
  },
  {
    id: 2,
    assignedTo: "Алексей",
    violation: "Просрочка платежа",
    date: "15.03.2025",
    amount: "200",
    status: "Не оплачен",
  },
  {
    id: 3,
    assignedTo: "Тимур",
    violation: "Невыполнение обязанностей",
    date: "18.03.2025",
    amount: "150",
    status: "Оплачен",
  },
  {
    id: 4,
    assignedTo: "Егор",
    violation: "Нарушение правил",
    date: "20.03.2025",
    amount: "120",
    status: "Не оплачен",
  },
  {
    id: 5,
    assignedTo: "Алексей",
    violation: "Задержка платежа",
    date: "22.03.2025",
    amount: "180",
    status: "Оплачен",
  },
  {
    id: 6,
    assignedTo: "Тимур",
    violation: "Нарушение регламента",
    date: "25.03.2025",
    amount: "130",
    status: "Не оплачен",
  },
  {
    id: 7,
    assignedTo: "Егор",
    violation: "Невыполнение обязанностей",
    date: "28.03.2025",
    amount: "160",
    status: "Оплачен",
  },
  {
    id: 8,
    assignedTo: "Алексей",
    violation: "Просрочка платежа",
    date: "30.03.2025",
    amount: "210",
    status: "Не оплачен",
  },
  {
    id: 9,
    assignedTo: "Тимур",
    violation: "Нарушение правил",
    date: "02.04.2025",
    amount: "140",
    status: "Оплачен",
  },
  {
    id: 10,
    assignedTo: "Егор",
    violation: "Задержка платежа",
    date: "05.04.2025",
    amount: "170",
    status: "Не оплачен",
  },
];

const PenaltyTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(violations.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentViolations = violations.slice(indexOfFirstItem, indexOfLastItem);

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
      {/* Пагинация вне таблицы */}
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

export default PenaltyTable;
