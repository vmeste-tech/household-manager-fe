import PropTypes from "prop-types";

const PurchasesChart = ({ purchasesData }) => {
  // Если данные не переданы, используем значения по умолчанию
  const defaultData = [4, 16, 24, 32, 20, 10, 10, 4, 16, 24, 32, 20];
  
  // Передаётся массив чисел, где каждое число — количество покупок за период
  const data = purchasesData && purchasesData.length > 0 ? purchasesData : defaultData;

  // Вычисляем кумулятивные суммы: каждая колонка — сумма предыдущих + новая покупка
  const cumulativeData = [];
  data.reduce((acc, value) => {
    const newTotal = acc + value;
    cumulativeData.push(newTotal);
    return newTotal;
  }, 0);

  // Количество колонок определяется длиной накопленных данных
  const numColumns = cumulativeData.length;
  // Определяем максимальное значение для масштабирования высоты столбцов
  const maxCount = Math.max(...cumulativeData, 1);
  // Максимальная высота столбца (в пикселях)
  const maxHeightPx = 128;

  // Рассчитываем динамический отступ между колонками:
  // Если колонок мало — отступ большой, если много — отступ уменьшается, но не менее 4px.
  const gap = Math.max(20 - (numColumns - 1) * 2, 4);

  return (
    <div
      className="flex-grow self-stretch"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numColumns}, minmax(0, 1fr))`,
        gap: `${gap}px`,
      }}
    >
      {cumulativeData.map((value, index) => {
        // Вычисляем высоту столбца пропорционально накопленной сумме
        const computedHeight = (value / maxCount) * maxHeightPx;
        return (
          <div key={index} className="flex flex-col justify-end items-center">
            <div
              className="w-full rounded-full bg-blue-200"
              style={{ height: `${computedHeight}px` }}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

PurchasesChart.propTypes = {
  purchasesData: PropTypes.arrayOf(PropTypes.number)
};

export default PurchasesChart;
