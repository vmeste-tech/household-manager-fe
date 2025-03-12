import PropTypes from "prop-types";

const PurchaseHistory = ({ purchases }) => {
  const totalExpenses = purchases.reduce(
    (sum, purchase) => sum + purchase.amount,
    0
  );

  return (
    <div className="p-4 max-w-xl mx-auto dark:bg-gray-800 bg-white rounded-xl">
      <div className="font-heading dark:text-gray-100 mb-8 text-xl font-bold">
        История покупок и затрат
      </div>

      {purchases.map((purchase, index) => (
        <div key={index} className="flex">
          <div className="mr-4 flex flex-col items-center">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-blue-800 dark:text-slate-200"
                >
                  <path d="M12 5l0 14" />
                  <path d="M18 13l-6 6" />
                  <path d="M6 13l6 6" />
                </svg>
              </div>
            </div>
            <div className="h-full w-px bg-gray-300 dark:bg-slate-500"></div>
          </div>
          <div className="pt-1 pb-8">
            <div className="mb-1 text-sm font-bold text-gray-900 dark:text-slate-300">
              {purchase.item} — {purchase.amount}₽
            </div>
            <div className="mb-1 text-sm text-gray-600 dark:text-slate-400">
              {purchase.date}
            </div>
            <div className="text-sm text-gray-600 dark:text-slate-400">
              {purchase.description}
            </div>
          </div>
        </div>
      ))}

      <div className="flex">
        <div className="mr-4 flex flex-col items-center">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-900 bg-blue-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-white dark:text-slate-200"
              >
                <path d="M5 12l5 5l10 -10" />
              </svg>
            </div>
          </div>
        </div>
        <div className="pt-1">
          <div className="mb-2 text-sm font-bold text-gray-900 dark:text-slate-300">
            Всего расходов: {totalExpenses}₽
          </div>
        </div>
      </div>
    </div>
  );
};

PurchaseHistory.propTypes = {
  purchases: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PurchaseHistory;
