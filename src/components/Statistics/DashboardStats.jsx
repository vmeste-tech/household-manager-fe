import PropTypes from "prop-types";
import StatCard from "./StatCard";

const DashboardStats = ({ stats }) => {
  return (
    <section className="grid gap-6 md:grid-cols-3 p-4 md:p-8 max-w-5xl mx-auto w-full">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          isIncrease={stat.isIncrease}
        />
      ))}
    </section>
  );
};

DashboardStats.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      change: PropTypes.string.isRequired,
      isIncrease: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default DashboardStats;
