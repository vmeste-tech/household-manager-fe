import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import PurchasesChart from "./PurchasesChart";

const PurchasesCard = ({ purchasesData = [] }) => {
  const navigate = useNavigate();
  
  // Значения по умолчанию, если данных нет
  const defaultData = [100, 200, 150, 300, 250, 400, 350, 500, 450, 550, 600, 650];
  const dataToUse = purchasesData.length > 0 ? purchasesData : defaultData;
  
  // Вычисляем общую сумму покупок
  const total = dataToUse.reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="relative">
      <div
        className="bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up"
        style={{ animationDelay: "0.3s" }}
      >
        {/* Заголовок — не меняем */}
        <h3 className="text-xl font-bold text-indigo-800">Затраты</h3>

        {/* Блок с суммой, выровненный по левому краю */}
        <div className="absolute top-1/2 left-6 transform -translate-y-1/2 z-10 inline-block bg-white bg-opacity-50 p-2 rounded">
          <div>
            <span className="text-3xl font-bold text-indigo-800">
              {total} руб.
            </span>
          </div>
          <div className="text-center">
            <span className="text-xs text-gray-600">потрачено за месяц</span>
          </div>
        </div>

        {/* График прижат к нижней части карточки */}
        <div className="absolute bottom-5 left-5 right-5">
          <PurchasesChart purchasesData={dataToUse} />
        </div>
      </div>
      {/* Невидимая кнопка, перекрывающая карточку */}
      <button
        onClick={() => navigate("/purchases")}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  );
};

PurchasesCard.propTypes = {
  purchasesData: PropTypes.arrayOf(PropTypes.number)
};

export default PurchasesCard;
