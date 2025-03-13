import PropTypes from "prop-types";
import { StatCard } from "./StatCard";

// Компонент для отображения сетки карточек статистики
export function StatCardsGrid({ cardsData }) {
  return (
    <div className="grid gap-4 lg:gap-8 grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
      {cardsData.map((card) => (
        <StatCard
          key={card.title}
          title={card.title}
          value={card.value}
          changeText={card.changeText}
          isIncrease={card.isIncrease}
        />
      ))}
    </div>
  );
}

StatCardsGrid.propTypes = {
  cardsData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      changeText: PropTypes.string.isRequired,
      isIncrease: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default StatCardsGrid;
