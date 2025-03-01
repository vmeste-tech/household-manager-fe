import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signin");
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen px-6 text-center">
      {/* Фон с радиальным градиентом (ближе к фиолетовому) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, white 20%, #a78bfa 80%)",
        }}
      ></div>

      <div className="relative z-10 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Управляйте домашними обязанностями вместе
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Организуйте совместное проживание, распределяйте задачи и создавайте
          гармоничное пространство для жизни.
        </p>
        <span
          onClick={handleClick}
          className="cursor-pointer no-underline inline-block mt-8 px-8 py-3 rounded-full text-xl text-white bg-indigo-800 hover:bg-indigo-900 transition-transform duration-300 hover:scale-105"
        >
          Начните прямо сейчас
        </span>
      </div>
    </section>
  );
};

export default Home;
