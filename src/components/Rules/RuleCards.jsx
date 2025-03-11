import PropTypes from "prop-types";
import RuleCard from "./RuleCard";

const RuleCards = ({ activeFilter, onAcceptRule, onRejectRule }) => {
  const rules = [
    {
      id: 1,
      gradientClass: "from-gray-300 to-white",
      title: "Правило 1",
      subtitle: "на голосовании",
      fine: 100,
      description:
        "Описание правила 1. Здесь описывается суть правила проживания.",
      svgClass:
        "iconify absolute top-8 left-8 text-[500px] z-[-1] pointer-events-none text-gray-100 transition duration-1000 delay-500 group-hover:-translate-y-8 group-hover:-translate-x-8",
      svgPath:
        "M6 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.414A2 2 0 0 0 15.414 6L12 2.586A2 2 0 0 0 10.586 2zm5 6a1 1 0 1 0-2 0v3.586l-1.293-1.293a1 1 0 1 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l3-3a1 1 0 0 0-1.414-1.414L11 11.586z",
      svgViewBox: "0 0 20 20",
    },
    {
      id: 2,
      gradientClass: "from-blue-300 to-white",
      title: "Правило 2",
      subtitle: "принято",
      fine: 50,
      description: "Описание правила 2. Правило уже принято.",
      svgClass:
        "iconify absolute top-8 left-8 text-[500px] z-[-1] pointer-events-none text-blue-100 transition duration-1000 delay-200 group-hover:-translate-y-8 group-hover:-translate-x-8",
      svgPath:
        "M11 4.25a6.75 6.75 0 0 0-6.624 5.448A5.25 5.25 0 0 0 6.5 19.75h11a5.25 5.25 0 0 0 .02-10.5a6.75 6.75 0 0 0-6.52-5m3.53 7.28a.75.75 0 1 0-1.06-1.06L10 13.94l-1.47-1.47a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0z",
      svgViewBox: "0 0 24 24",
    },
    {
      id: 3,
      gradientClass: "from-indigo-600 to-white",
      title: "Правило 3",
      subtitle: "отклонено",
      fine: 75,
      description: "Описание правила 3. Правило было отклонено.",
      svgClass:
        "iconify absolute top-8 left-8 text-[500px] z-[-1] pointer-events-none text-indigo-100 transition duration-1000 delay-1000 group-hover:-translate-y-8 group-hover:-translate-x-8",
      svgPath:
        "M22 13.478V18a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-4.522l.553.277a21 21 0 0 0 18.897-.002zM14 2a3 3 0 0 1 3 3v1h2a3 3 0 0 1 3 3v2.242l-1.447.724a19 19 0 0 1-16.726.186l-.647-.32l-1.18-.59V9a3 3 0 0 1 3-3h2V5a3 3 0 0 1 3-3zm-2 8a1 1 0 0 0-1 1a1 1 0 1 0 2 .01c0-.562-.448-1.01-1-1.01m2-6h-4a1 1 0 0 0-1 1v1h6V5a1 1 0 0 0-1-1",
      svgViewBox: "0 0 24 24",
    },
  ];

  // Сопоставление кнопок фильтрации со статусом правила
  const filterMapping = {
    "На голосовании": "на голосовании",
    Принятые: "принято",
    Отклонённые: "отклонено",
  };

  // Фильтрация правил по выбранному фильтру
  const filteredRules =
    activeFilter === "Все"
      ? rules
      : rules.filter((rule) => rule.subtitle === filterMapping[activeFilter]);

  return (
    <div className="space-y-6 lg:px-8 text-center group">
      <div className="mx-auto grid items-stretch justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:pb-10">
        {filteredRules.map((rule) => (
          <RuleCard
            key={rule.id}
            gradientClass={rule.gradientClass}
            title={rule.title}
            subtitle={rule.subtitle}
            fine={rule.fine}
            description={rule.description}
            onAccept={onAcceptRule}
            onReject={onRejectRule}
            svgClass={rule.svgClass}
            svgPath={rule.svgPath}
            svgViewBox={rule.svgViewBox}
          />
        ))}
      </div>
    </div>
  );
};

RuleCards.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  onAcceptRule: PropTypes.func,
  onRejectRule: PropTypes.func,
};

export default RuleCards;
