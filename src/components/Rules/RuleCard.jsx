import PropTypes from "prop-types";

const RuleCard = ({ rule, styleConfig, onClick }) => {
  const style = styleConfig || {
    gradientClass: "from-gray-400 to-gray-600",
    svgPath: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    svgViewBox: "0 0 24 24",
    badgeClass: "bg-gray-100 text-gray-800",
  };

  const getStatusBadge = (status) => {
    return (
      <span
        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${style.badgeClass}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
    >
      <div className={`h-2 bg-gradient-to-r ${style.gradientClass}`}></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-indigo-600"
              fill="none"
              viewBox={style.svgViewBox}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={style.svgPath}
              />
            </svg>
          </div>
          <div>{getStatusBadge(rule.status)}</div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {rule.title}
        </h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">
          {rule.description}
        </p>

        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            Штраф:{" "}
            <span className="font-semibold text-indigo-600">{rule.fine}</span>
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
  );
};

RuleCard.propTypes = {
  rule: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    fine: PropTypes.string.isRequired,
    votesFor: PropTypes.number.isRequired,
    votesAgainst: PropTypes.number.isRequired,
    createdBy: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  styleConfig: PropTypes.shape({
    gradientClass: PropTypes.string.isRequired,
    svgPath: PropTypes.string.isRequired,
    svgViewBox: PropTypes.string.isRequired,
    badgeClass: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};

export default RuleCard;
