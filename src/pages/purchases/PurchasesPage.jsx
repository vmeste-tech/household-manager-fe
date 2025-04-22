import { useState } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import Heading from "../../components/Universal/Heading";
import CustomButton from "../../components/Universal/CustomButton";
import CreateExpenseItemModal from "../../components/Modal/CreateExpenseItemModal";
import CreateExpenseModal from "../../components/Modal/CreateExpenseModal";

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
  // Состояние для выбранной категории затрат
  const [selectedExpense, setSelectedExpense] = useState(null);

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

  const handleExpenseClick = (expense) => {
    setSelectedExpense(expense.id === selectedExpense?.id ? null : expense);
  };

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader />
      <div className="pt-16 sm:pt-20 px-2 sm:px-4 max-w-7xl mx-auto flex flex-col gap-4 sm:gap-8 pb-8">
        <Heading>Покупки и затраты</Heading>
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* История покупок - now as primary element */}
          <div className="w-full lg:w-3/5 lg:flex-grow">
            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-semibold text-gray-800">История покупок</div>
                <CustomButton
                  text="+ Добавить затрату"
                  variant="filled"
                  onClick={() => setExpenseModalOpen(true)}
                  className="py-1 px-3 text-sm"
                />
              </div>
              
              <div className="space-y-3">
                {purchasesData.map((purchase, index) => (
                  <div 
                    key={index} 
                    className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-800">{purchase.item}</span>
                      <span className="text-indigo-700 font-semibold">{purchase.amount} ₽</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">{purchase.description}</span>
                      <span className="text-gray-400 bg-gray-50 px-2 py-0.5 rounded text-xs">
                        {purchase.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Summary card */}
            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4">
              <div className="text-lg font-semibold text-gray-800 mb-2">Итого за период</div>
              <div className="flex justify-between items-center text-lg font-medium">
                <span className="text-gray-600">Сумма затрат:</span>
                <span className="text-indigo-700">
                  {purchasesData.reduce((sum, item) => sum + item.amount, 0)} ₽
                </span>
              </div>
            </div>
          </div>
          
          {/* Категории затрат - компактное отображение */}
          <div className="w-full lg:w-2/5 bg-white rounded-xl shadow-sm p-3 sm:p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold text-gray-800">Категории затрат</div>
              <CustomButton
                text="+ Добавить"
                variant="outlined"
                onClick={() => setExpenseItemModalOpen(true)}
                className="py-1 px-3 text-sm"
              />
            </div>
            
            {/* Компактный список категорий */}
            <div className="space-y-1 mb-4">
              {expenses.map((expense) => (
                <div 
                  key={expense.id}
                  onClick={() => handleExpenseClick(expense)}
                  className={`flex justify-between items-center p-2 rounded-lg cursor-pointer transition-colors ${
                    selectedExpense?.id === expense.id 
                      ? 'bg-indigo-50 border-l-4 border-indigo-500' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="font-medium text-gray-800 truncate">
                    {expense.item}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Панель с подробностями о выбранной категории */}
            {selectedExpense && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="text-md font-semibold text-gray-800 mb-2">
                  {selectedExpense.item}
                </div>
                <p className="text-sm text-gray-600">
                  {selectedExpense.description}
                </p>
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => setExpenseModalOpen(true)}
                    className="px-4 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
                  >
                    Внести затрату
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Модальные окна */}
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
