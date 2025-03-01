import PropTypes from "prop-types";
import PurchasesChart from "./PurchasesChart";

const PurchasesCard = ({ purchasesData }) => {
  // Вычисляем общую сумму покупок
  const total = purchasesData.reduce((acc, curr) => acc + curr, 0);

  return (
    <div
      className="relative bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up"
      style={{ animationDelay: "0.3s" }}
    >
      {/* Заголовок — не меняем */}
      <h3 className="text-xl font-bold text-indigo-800">Покупки</h3>

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
        <PurchasesChart purchasesData={purchasesData} />
      </div>
    </div>
  );
};

PurchasesCard.propTypes = {
  purchasesData: PropTypes.arrayOf(PropTypes.number),
};

export default PurchasesCard;
