import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import BarChart from "../../components/Finances/BarChart";
import DebtsTable from "../../components/Finances/DebtsTable";
import FilterDropdown from "../../components/Finances/FilterDropdown";
import ProgressTable from "../../components/Finances/ProgressTable";

function FinancesPage() {
  // Модель данных для пользователей (единая модель)
  const userData = {
    Егор: { fines: 100, expenses: 250 },
    Алексей: { fines: 456, expenses: 380 },
    Тимур: { fines: 123, expenses: 210 },
    Иван: { fines: 45, expenses: 90 },
    Сергей: { fines: 0, expenses: 50 },
  };

  // Данные для долгов – отдельный запрос (пока константа)
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

  const filtersData = [
    {
      label: "По пользователю",
      items: ["Егор", "Алексей", "Тимур"],
      selected: ["Егор"],
      multiple: true,
    },
    {
      label: "По времени",
      items: ["За сегодня", "За текущий месяц", "За всё время"],
      selected: ["За текущий месяц"],
      multiple: false,
    },
  ];

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader />
      <div className="pt-20 max-w-7xl mx-auto flex flex-col gap-8">
        <FilterDropdown filters={filtersData} />

        {/* Контейнер с таблицей и графиком */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <ProgressTable userData={userData} />
          <BarChart userData={userData} />
        </div>

        <DebtsTable debts={debts} />
      </div>
    </div>
  );
}

export default FinancesPage;
