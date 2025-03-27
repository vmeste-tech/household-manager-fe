import PropTypes from "prop-types";

const RuleCards = ({ activeFilter }) => {
  const rules = [
    {
      id: 1,
      title: "Тишина после 22:00",
      description:
        "Запрещается шуметь после 22:00, чтобы не мешать другим жильцам отдыхать перед следующим рабочим днем.",
      status: "Принятые",
      fine: "500₽",
      votesFor: 4,
      votesAgainst: 1,
      createdBy: "Иван Иванов",
      createdAt: "2023-09-15",
      gradientClass: "from-blue-500 to-indigo-600",
      svgPath:
        "M6 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.414A2 2 0 0 0 15.414 6L12 2.586A2 2 0 0 0 10.586 2zm5 6a1 1 0 1 0-2 0v3.586l-1.293-1.293a1 1 0 1 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l3-3a1 1 0 0 0-1.414-1.414L11 11.586z",
      svgViewBox: "0 0 20 20",
    },
    {
      id: 2,
      title: "График уборки",
      description:
        "Ежедневная уборка общественных зон согласно установленному графику. Каждый жилец обязан следовать своему расписанию.",
      status: "Принятые",
      fine: "300₽",
      votesFor: 5,
      votesAgainst: 0,
      createdBy: "Анна Смирнова",
      createdAt: "2023-09-10",
      gradientClass: "from-teal-400 to-green-500",
      svgPath:
        "M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2zm0 8a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2zm6-6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2zm0 8a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      svgViewBox: "0 0 20 20",
    },
    {
      id: 3,
      title: "Ограничение на использование ванной",
      description:
        "Максимальное время использования ванной в часы пик (утром с 7:00 до 9:00 и вечером с 19:00 до 21:00) - 30 минут.",
      status: "На голосовании",
      fine: "200₽",
      votesFor: 2,
      votesAgainst: 1,
      createdBy: "Петр Петров",
      createdAt: "2023-09-20",
      gradientClass: "from-amber-400 to-orange-500",
      svgPath:
        "M11 3a1 1 0 10-2 0v1a1 1 0 102 0zm4 8a4 4 0 11-8 0 4 4 0 018 0m-4 8a8 8 0 008-8 1 1 0 00-2 0 6 6 0 01-6 6c-1.66 0-3.16-.67-4.24-1.76l1.41-1.41A4.993 4.993 0 0019 13a1 1 0 01-2 0 3 3 0 01-3-3 1 1 0 00-2 0 5 5 0 01-5 5 1 1 0 000 2",
      svgViewBox: "0 0 20 20",
    },
    {
      id: 4,
      title: "Запрет на курение в помещении",
      description:
        "Запрещается курение в квартире. Для курения необходимо выходить на балкон или улицу.",
      status: "Принятые",
      fine: "1000₽",
      votesFor: 3,
      votesAgainst: 2,
      createdBy: "Мария Иванова",
      createdAt: "2023-08-15",
      gradientClass: "from-red-400 to-pink-500",
      svgPath: "M13 10V3L4 14h7v7l9-11h-7z",
      svgViewBox: "0 0 20 20",
    },
    {
      id: 5,
      title: "Использование стиральной машины",
      description:
        "Запрещается использовать стиральную машину после 23:00, чтобы не мешать соседям спать.",
      status: "Отклонённые",
      fine: "300₽",
      votesFor: 1,
      votesAgainst: 4,
      createdBy: "Алексей Сидоров",
      createdAt: "2023-09-01",
      gradientClass: "from-purple-400 to-indigo-500",
      svgPath: "M10 2a8 8 0 100 16 8 8 0 000-16M8 8a1 1 0 100 2h4a1 1 0 100-2z",
      svgViewBox: "0 0 20 20",
    },
  ];

  const filteredRules =
    activeFilter === "Все"
      ? rules
      : rules.filter((rule) => rule.status === activeFilter);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Принятые":
        return (
          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            {status}
          </span>
        );
      case "На голосовании":
        return (
          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
            {status}
          </span>
        );
      case "Отклонённые":
        return (
          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            {status}
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRules.map((rule) => (
        <div
          key={rule.id}
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
        >
          <div className={`h-2 bg-gradient-to-r ${rule.gradientClass}`}></div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-indigo-600"
                  fill="none"
                  viewBox={rule.svgViewBox}
                >
                  <path d={rule.svgPath} fill="currentColor" />
                </svg>
              </div>
              <div>{getStatusBadge(rule.status)}</div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {rule.title}
            </h3>
            <p className="text-gray-600 mb-4 text-sm">{rule.description}</p>

            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                Штраф:{" "}
                <span className="font-semibold text-indigo-600">
                  {rule.fine}
                </span>
              </div>

              {rule.status === "На голосовании" && (
                <div className="flex items-center">
                  <span className="text-sm text-green-600 mr-2">
                    {rule.votesFor}
                  </span>
                  <svg
                    className="h-4 w-4 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-red-600 mx-2">
                    {rule.votesAgainst}
                  </span>
                  <svg
                    className="h-4 w-4 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}

              <div className="text-xs text-gray-500">
                {new Date(rule.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

RuleCards.propTypes = {
  activeFilter: PropTypes.string.isRequired,
};

export default RuleCards;
