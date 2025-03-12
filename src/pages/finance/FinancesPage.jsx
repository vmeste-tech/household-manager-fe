import { useState } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import BarChart from "../../components/Finances/BarChart";
import DebtsTable from "../../components/Finances/DebtsTable";
import FilterDropdown from "../../components/Finances/FilterDropdown";
import ProgressTable from "../../components/Finances/ProgressTable";

function FinancesPage() {
  // Исходная модель данных пользователей
  const userData = {
    Егор: { fines: 100, expenses: 250 },
    Алексей: { fines: 456, expenses: 380 },
    Тимур: { fines: 123, expenses: 210 },
    Иван: { fines: 45, expenses: 90 },
    Сергей: { fines: 0, expenses: 50 },
  };

  // Данные для долгов (константа)
  const debts = [
    {
      id: 1,
      debtor: "Егор",
      creditor: "Тимур",
      amount: "1500",
      status: "Задолженность",
    },
    {
      id: 2,
      debtor: "Тимур",
      creditor: "Алексей",
      amount: "800",
      status: "Погашено",
    },
    // Пример долга с участием выбранных пользователей
    {
      id: 3,
      debtor: "Егор",
      creditor: "Алексей",
      amount: "500",
      status: "Задолженность",
    },
  ];

  // Начальные данные фильтров
  const initialFiltersData = [
    {
      label: "По пользователю",
      items: ["Егор", "Алексей", "Тимур"],
      selected: [],
      multiple: true,
    },
    {
      label: "По времени",
      items: ["За сегодня", "За текущий месяц", "За всё время"],
      selected: ["За текущий месяц"],
      multiple: false,
    },
  ];

  // Поднимаем состояние фильтров на уровень страницы
  const [filters, setFilters] = useState(initialFiltersData);

  // Callback для обновления фильтров (будет вызываться из FilterDropdown)
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Извлекаем выбранных пользователей из фильтра "По пользователю"
  const userFilter = filters.find(
    (filter) => filter.label === "По пользователю"
  );
  const selectedUsers =
    userFilter && userFilter.selected && userFilter.selected.length > 0
      ? userFilter.selected
      : Object.keys(userData);

  // Формируем данные для таблицы и графика исходя из выбранных пользователей
  const filteredUserData = Object.keys(userData).reduce((acc, user) => {
    if (selectedUsers.includes(user)) {
      acc[user] = userData[user];
    }
    return acc;
  }, {});

  // Фильтруем долги, оставляя те, где должник или кредитор входит в выбранных пользователей
  const filteredDebts = debts.filter(
    (debt) =>
      selectedUsers.includes(debt.debtor) ||
      selectedUsers.includes(debt.creditor)
  );

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader />
      <div className="pt-20 max-w-7xl mx-auto flex flex-col gap-8">
        {/* Передаём как filters, так и callback для обновления фильтров */}
        <FilterDropdown
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />

        {/* Передаём отфильтрованные данные */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <ProgressTable userData={filteredUserData} />
          <BarChart userData={filteredUserData} />
        </div>

        <DebtsTable debts={filteredDebts} />
      </div>
    </div>
  );
}

export default FinancesPage;
