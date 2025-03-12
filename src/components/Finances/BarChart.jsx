import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import PropTypes from "prop-types";

const BarChart = ({ userData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const names = Object.keys(userData);
    const fines = names.map((name) => userData[name].fines);
    const expenses = names.map((name) => userData[name].expenses);

    const ctx = canvasRef.current.getContext("2d");

    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: names,
        datasets: [
          {
            label: "Штрафы",
            data: fines,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: "Траты",
            data: expenses,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false, // добавляем для растяжения графика
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Сумма, ₽",
            },
          },
          x: {
            title: {
              display: true,
              text: "Пользователь",
            },
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [userData]);

  return (
    <div className="bg-white p-2 rounded-xl">
      {/* Можно задать высоту контейнера, если требуется */}
      <canvas ref={canvasRef} style={{ height: "100%" }}></canvas>
    </div>
  );
};

BarChart.propTypes = {
  userData: PropTypes.objectOf(
    PropTypes.shape({
      fines: PropTypes.number.isRequired,
      expenses: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default BarChart;
