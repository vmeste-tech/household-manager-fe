import { useState, useEffect } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import BarChart from "../../components/Finances/BarChart";
import DebtsTable from "../../components/Finances/DebtsTable";
import FilterDropdown from "../../components/Finances/FilterDropdown";
import ProgressTable from "../../components/Finances/ProgressTable";
import Heading from "../../components/Universal/Heading";
import { financeApi } from "../../api";

// Функция для красивого отображения периода (YYYYMM -> "Март 2025")
function formatPeriod(period) {
  const periodStr = period.toString();
  const year = periodStr.substring(0, 4);
  const month = periodStr.substring(4);
  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
}

function FinancesPage() {
  // Состояния для данных API
  const [participants, setParticipants] = useState([]); // данные финансов пользователей
  const [debts, setDebts] = useState([]); // данные долгов
  const [loading, setLoading] = useState(true);

  // Начальные данные для фильтров.
  // Фильтр "По пользователю" изначально пуст, его список заполняется после получения данных.
  // Фильтр "По периоду" задается в формате YYYYMM, например, "202503"
  const initialFiltersData = [
    {
      label: "По пользователю",
      items: [], // заполнятся после загрузки данных
      selected: [],
      multiple: true,
    },
    {
      label: "По периоду",
      items: ["202503", "202502", "202501"],
      selected: ["202503"],
      multiple: false,
    },
  ];

  const [filters, setFilters] = useState(initialFiltersData);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Извлекаем выбранный период из фильтра "По периоду"
  const periodFilter = filters.find((filter) => filter.label === "По периоду");
  const selectedPeriod =
    periodFilter && periodFilter.selected && periodFilter.selected.length > 0
      ? periodFilter.selected[0]
      : null;

  // Создаем экземпляр API-клиента
  useEffect(() => {
    const apartmentId = localStorage.getItem("apartmentId");
    if (!apartmentId || !selectedPeriod) {
      console.error("Не найден apartmentId или не выбран период");
      setLoading(false);
      return;
    }

    // Запрашиваем финансовые данные пользователей (participants)
    financeApi.getUserFinances(
      apartmentId,
      parseInt(selectedPeriod),
      (error, data) => {
        if (error) {
          console.error("Ошибка получения финансов пользователей:", error);
        } else {
          setParticipants(data);
          // Заполняем фильтр по пользователям на основе полученных данных
          const userNames = Array.from(new Set(data.map((user) => user.name)));
          setFilters((prevFilters) =>
            prevFilters.map((filter) =>
              filter.label === "По пользователю"
                ? { ...filter, items: userNames, selected: userNames }
                : filter
            )
          );
        }
        setLoading(false);
      }
    );

    // Запрашиваем список долгов
    financeApi.getDebts(
      apartmentId,
      parseInt(selectedPeriod),
      (error, data) => {
        if (error) {
          console.error("Ошибка получения долгов:", error);
        } else {
          setDebts(data);
        }
      }
    );
  }, [selectedPeriod]);

  // Извлекаем выбранных пользователей из фильтра "По пользователю"
  const userFilter = filters.find(
    (filter) => filter.label === "По пользователю"
  );
  const selectedUsers =
    userFilter && userFilter.selected && userFilter.selected.length > 0
      ? userFilter.selected
      : [];

  // Агрегируем данные для диаграмм и таблицы.
  // Группируем финансовые данные пользователей по имени, суммируя расходы и штрафы.
  const aggregatedUserData = participants.reduce((acc, user) => {
    if (selectedUsers.includes(user.name)) {
      if (acc[user.name]) {
        acc[user.name].expenses += user.expense;
        acc[user.name].fines += user.fine;
      } else {
        acc[user.name] = { expenses: user.expense, fines: user.fine };
      }
    }
    return acc;
  }, {});

  // Фильтруем долги: оставляем те, где должник или кредитор входит в выбранные пользователи
  const filteredDebts = debts.filter(
    (debt) =>
      selectedUsers.includes(debt.debtor) ||
      selectedUsers.includes(debt.creditor)
  );
  // Округляем сумму каждого долга до двух знаков после запятой
  const filteredDebtsRounded = filteredDebts.map((debt) => ({
    ...debt,
    amount: Math.round(debt.amount * 100) / 100,
  }));

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-8">
        <Heading>Статистика расходов</Heading>
        <FilterDropdown
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <ProgressTable userData={aggregatedUserData} />
          <BarChart userData={aggregatedUserData} />
        </div>
        <Heading>Таблица задолженностей</Heading>
        <DebtsTable debts={filteredDebtsRounded} />
        {selectedPeriod && (
          <p className="text-center text-gray-500 mt-4">
            Отображается период: {formatPeriod(selectedPeriod)}
          </p>
        )}
      </div>
    </div>
  );
}

export default FinancesPage;
