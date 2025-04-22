import { useState, useEffect } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import Heading from "../../components/Universal/Heading";
import CustomButton from "../../components/Universal/CustomButton";
import CreateExpenseItemModal from "../../components/Modal/CreateExpenseItemModal";
import CreateExpenseModal from "../../components/Modal/CreateExpenseModal";
import { financeApi } from "../../api";
import ExpenseItemCreateDto from "../../generated-finance-client-js/src/model/ExpenseItemCreateDto";
import CreateExpenseRequest from "../../generated-finance-client-js/src/model/CreateExpenseRequest";

function PurchasesPage() {
  // Состояния для данных
  const [expenses, setExpenses] = useState([]); // Категории затрат
  const [purchasesData, setPurchasesData] = useState([]); // История расходов
  const [selectedExpense, setSelectedExpense] = useState(null);
  
  // Состояния для управления интерфейсом
  const [isExpenseItemModalOpen, setExpenseItemModalOpen] = useState(false);
  const [isExpenseModalOpen, setExpenseModalOpen] = useState(false);
  const [loading, setLoading] = useState({
    expenseItems: true,
    expenses: true
  });
  const [error, setError] = useState({
    expenseItems: null,
    expenses: null
  });

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    loadExpenseItems();
    loadExpenses();
  }, []);

  // Получение категорий затрат
  const loadExpenseItems = () => {
    const apartmentId = localStorage.getItem("apartmentId");
    if (!apartmentId) {
      setError(prev => ({...prev, expenseItems: "ID квартиры не найден"}));
      setLoading(prev => ({...prev, expenseItems: false}));
      return;
    }

    financeApi.getApartmentExpenseItem(apartmentId, (err, data) => {
      setLoading(prev => ({...prev, expenseItems: false}));
      if (err) {
        console.error("Ошибка при загрузке категорий затрат:", err);
        setError(prev => ({...prev, expenseItems: "Ошибка загрузки категорий затрат"}));
      } else {
        setExpenses(data);
        setError(prev => ({...prev, expenseItems: null}));
      }
    });
  };

  // Получение истории расходов
  const loadExpenses = () => {
    // Формируем параметры для запроса расходов за последние 30 дней
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    const opts = {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    };

    financeApi.getExpenses(opts, (err, data) => {
      setLoading(prev => ({...prev, expenses: false}));
      if (err) {
        console.error("Ошибка при загрузке расходов:", err);
        setError(prev => ({...prev, expenses: "Ошибка загрузки расходов"}));
      } else {
        setPurchasesData(data || []);
        setError(prev => ({...prev, expenses: null}));
      }
    });
  };

  const handleCreateExpenseItem = (newExpenseItemData) => {
    const apartmentId = localStorage.getItem("apartmentId");
    if (!apartmentId) {
      console.error("ID квартиры не найден");
      return;
    }

    const expenseItemDto = new ExpenseItemCreateDto();
    expenseItemDto.apartmentId = apartmentId;
    expenseItemDto.name = newExpenseItemData.name;
    expenseItemDto.description = newExpenseItemData.description;

    financeApi.createExpenseItem(expenseItemDto, (err, data) => {
      if (err) {
        console.error("Ошибка при создании категории затрат:", err);
        // Можно добавить уведомление об ошибке
      } else {
        console.log("Категория затрат создана:", data);
        setExpenses(prev => [...prev, data]);
      }
      setExpenseItemModalOpen(false);
    });
  };

  const handleCreateExpense = (newExpenseData) => {
    const apartmentId = localStorage.getItem("apartmentId");
    if (!apartmentId) {
      console.error("ID квартиры не найден");
      return;
    }

    const expenseRequest = new CreateExpenseRequest();
    expenseRequest.amount = newExpenseData.amount;
    expenseRequest.description = newExpenseData.description;
    expenseRequest.itemId = newExpenseData.itemId;
    expenseRequest.apartmentId = apartmentId;
    
    // Если есть фото, добавляем его в запрос
    if (newExpenseData.photoBase64) {
      expenseRequest.photoBase64 = newExpenseData.photoBase64;
    }

    financeApi.createExpenses(expenseRequest, (err, data) => {
      if (err) {
        console.error("Ошибка при создании расхода:", err);
        // Можно добавить уведомление об ошибке
      } else {
        console.log("Расход создан:", data);
        // Обновляем список расходов
        loadExpenses();
      }
      setExpenseModalOpen(false);
    });
  };

  const handleExpenseClick = (expense) => {
    setSelectedExpense(expense.id === selectedExpense?.id ? null : expense);
  };

  // Форматирование даты для отображения в российском формате (ДД.ММ.ГГГГ)
  const formatDate = (dateString) => {
    try {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('ru-RU', options);
    } catch (e) {
      console.error("Ошибка при форматировании даты:", e);
      return dateString;
    }
  };

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader />
      <div className="pt-16 sm:pt-20 px-2 sm:px-4 max-w-7xl mx-auto flex flex-col gap-4 sm:gap-8 pb-8">
        <Heading>Покупки и затраты</Heading>
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* История покупок */}
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
              
              {loading.expenses ? (
                <div className="py-4 text-center text-gray-500">Загрузка данных...</div>
              ) : error.expenses ? (
                <div className="py-4 text-center text-red-500">{error.expenses}</div>
              ) : purchasesData.length === 0 ? (
                <div className="py-4 text-center text-gray-500">Нет данных о расходах</div>
              ) : (
                <div className="space-y-3">
                  {purchasesData.map((purchase) => (
                    <div 
                      key={purchase.id}
                      className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-800">{purchase.expenseItemName}</span>
                        <span className="text-indigo-700 font-semibold">{purchase.amount} ₽</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">{purchase.description}</span>
                        <span className="text-gray-400 bg-gray-50 px-2 py-0.5 rounded text-xs">
                          {formatDate(purchase.createdDate)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Summary card */}
            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4">
              <div className="text-lg font-semibold text-gray-800 mb-2">Итого за период</div>
              <div className="flex justify-between items-center text-lg font-medium">
                <span className="text-gray-600">Сумма затрат:</span>
                <span className="text-indigo-700">
                  {loading.expenses ? "Загрузка..." : 
                   error.expenses ? "Ошибка" : 
                   `${purchasesData.reduce((sum, item) => sum + item.amount, 0)} ₽`}
                </span>
              </div>
            </div>
          </div>
          
          {/* Категории затрат */}
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
            
            {loading.expenseItems ? (
              <div className="py-4 text-center text-gray-500">Загрузка категорий...</div>
            ) : error.expenseItems ? (
              <div className="py-4 text-center text-red-500">{error.expenseItems}</div>
            ) : expenses.length === 0 ? (
              <div className="py-4 text-center text-gray-500">Нет категорий затрат</div>
            ) : (
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
                      {expense.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
            
            {/* Панель с подробностями о выбранной категории */}
            {selectedExpense && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="text-md font-semibold text-gray-800 mb-2">
                  {selectedExpense.name}
                </div>
                <p className="text-sm text-gray-600">
                  {selectedExpense.description}
                </p>
                <div className="mt-3 flex justify-end">
                  {/* Здесь можно добавить кнопки действий, например редактирование */}
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
