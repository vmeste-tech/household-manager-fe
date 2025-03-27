import { useState } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import Heading from "../../components/Universal/Heading";
import CustomButton from "../../components/Universal/CustomButton";
import PurchaseTables from "../../components/Purchases/PurchaseTables";
import CreateExpenseItemModal from "../../components/Modal/CreateExpenseItemModal";
import CreateExpenseModal from "../../components/Modal/CreateExpenseModal";
import PurchaseHistory from "../../components/Purchases/PurchaseHistory";

function PurchasesPage() {
  // Исходные данные для таблицы затрат
  const expencesData = [
    {
      id: 1,
      item: "Продукты для недели",
      description: "Овощи, фрукты, молочные продукты, хлеб и яйца.",
    },
    {
      id: 2,
      item: "Бытовая химия",
      description:
        "Моющее средство, чистящие средства, мыло и дезинфицирующие средства.",
    },
    {
      id: 3,
      item: "Канцелярия",
      description: "Бумага, ручки, маркеры, степлеры и скрепки.",
    },
    {
      id: 4,
      item: "Зоотовары",
      description: "Корм, игрушки и аксессуары для домашних животных.",
    },
    {
      id: 5,
      item: "Одежда",
      description: "Футболки, джинсы, куртки и аксессуары.",
    },
    {
      id: 6,
      item: "Электроника",
      description: "Смартфоны, планшеты, наушники и зарядные устройства.",
    },
  ];

  const purchasesData = [
    {
      item: "Оплата ЖКХ",
      date: "2025-03-10",
      amount: 1500,
      description: "Оплата квартплаты за февраль.",
    },
    {
      item: "Покупка продуктов",
      date: "2025-03-11",
      amount: 2300,
      description: "Совместная покупка продуктов на неделю.",
    },
    {
      item: "Оплата интернета",
      date: "2025-03-12",
      amount: 800,
      description: "Ежемесячная оплата интернета.",
    },
  ];

  // Храним список статей затрат в состоянии, чтобы обновлять при создании новой статьи
  const [expenses, setExpenses] = useState(expencesData);
  // Состояние для управления модальными окнами
  const [isExpenseItemModalOpen, setExpenseItemModalOpen] = useState(false);
  const [isExpenseModalOpen, setExpenseModalOpen] = useState(false);

  const handleCreateExpenseItem = (newExpenseItem) => {
    // Обычно ID генерируется на сервере. Для демонстрации создаём его на клиенте.
    const newId = expenses.length + 1;
    const expenseItem = { id: newId, ...newExpenseItem };
    setExpenses([...expenses, expenseItem]);
    setExpenseItemModalOpen(false);
  };

  const handleCreateExpense = (newExpense) => {
    // Здесь можно вызвать API для создания затраты или обновить локальное состояние
    console.log("Новая затратa:", newExpense);
    setExpenseModalOpen(false);
  };

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader />
      <div className="pt-20 max-w-7xl px-4 mx-auto flex flex-col gap-8">
        <Heading>Покупки и затраты</Heading>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Таблица затрат */}
          <div className="flex-1">
            <div className="flex justify-center mb-3">
              <CustomButton
                text="+ Добавить статью затрат"
                variant="filled"
                onClick={() => setExpenseItemModalOpen(true)}
              />
            </div>
            <PurchaseTables expenses={expenses} />
          </div>
          {/* История покупок */}
          <div className="flex-1">
            <div className="flex justify-center mb-3">
              <CustomButton
                text="+ Добавить затрату"
                variant="outlined"
                onClick={() => setExpenseModalOpen(true)}
              />
            </div>
            <PurchaseHistory purchases={purchasesData} />
          </div>
        </div>
      </div>

      {/* Модальное окно для создания статьи затрат */}
      {isExpenseItemModalOpen && (
        <CreateExpenseItemModal
          onClose={() => setExpenseItemModalOpen(false)}
          onCreate={handleCreateExpenseItem}
        />
      )}

      {/* Модальное окно для внесения затрат */}
      {isExpenseModalOpen && (
        <CreateExpenseModal
          onClose={() => setExpenseModalOpen(false)}
          onCreate={handleCreateExpense}
          expenseItems={expenses} // список статей для выбора при внесении затрат
        />
      )}
    </div>
  );
}

export default PurchasesPage;
