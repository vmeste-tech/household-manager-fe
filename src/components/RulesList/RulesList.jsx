import PropTypes from "prop-types";
import RuleCard from "../RuleCard/RuleCard";
import "./RulesList.css";

function RulesList({ rules }) {
  return (
    <div className="rules-list">
      {rules.map((rule, index) => (
        <RuleCard
          key={index}
          title={rule.title}
          fine={rule.fine}
          status={rule.status}
          frequency={rule.frequency}
        />
      ))}
    </div>
  );
}

RulesList.propTypes = {
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired, // Название правила
      fine: PropTypes.string.isRequired, // Штраф
      status: PropTypes.string.isRequired, // Статус
      frequency: PropTypes.string.isRequired, // Частота
    })
  ).isRequired,
};

export default RulesList;
