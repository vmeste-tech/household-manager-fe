import { Container, Row, Col, Image, Button } from "react-bootstrap";
import ClickableCard from "../../components/ClickableCard/ClickableCard";
import "../../App.css";
import "./Main.css";
import Dashboard from "../../components/Dashboard/Dashboard";

const gradients = [
  "linear-gradient(90deg, rgba(140,230,255,1) 0%, rgba(0,0,0,1) 100%)",
  "linear-gradient(90deg, rgba(194,110,65,1) 0%, rgba(0,0,0,1) 100%)",
  "linear-gradient(90deg, rgba(194,177,65,1) 0%, rgba(0,0,0,1) 100%)",
  "linear-gradient(90deg, rgba(119,65,194,1) 0%, rgba(0,0,0,1) 100%)",
  "linear-gradient(90deg, rgba(194,65,65,1) 0%, rgba(0,0,0,1) 100%)",
  "linear-gradient(90deg, rgba(65,194,177,1) 0%, rgba(0,0,0,1) 100%)",
  "linear-gradient(90deg, rgba(80,194,65,1) 0%, rgba(0,0,0,1) 100%)",
  "linear-gradient(90deg, rgba(194,65,141,1) 0%, rgba(0,0,0,1) 100%)",
];

const imageUrls = [
  "/task.png",
  "/rules.png",
  "/alarm.png",
  "/male.png",
  "/coins.png",
  "/shop.png",
  "/cash.png",
  "/home.png",
];

const blockNames = [
  "ЗАДАЧИ",
  "ПРАВИЛА",
  "УВЕДОМЛЕНИЯ",
  "ПРОФИЛЬ",
  "ШТРАФЫ",
  "ПОКУПКИ",
  "ФИНАНСЫ",
  "КВАРТИРА",
];

const cardContents = [
  <div key="tasks" style={{ color: "#fff" }}>
    <div style={{ fontSize: "3.5rem", fontWeight: "bold" }}>
      <span style={{ color: "#C2F2FF" }}>8 / 12</span>
    </div>
    <div style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
      прогресс за сегодня
    </div>
    <div style={{ marginTop: "0.5rem", position: "relative" }}>
      <div
        style={{
          height: "0.5rem",
          backgroundColor: "#8CE6FF",
          borderRadius: "0.25rem",
          width: "67%",
        }}
      />
      <div
        style={{
          height: "0.5rem",
          backgroundColor: "#555",
          borderRadius: "0.25rem",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
    </div>
  </div>,

  // Существующие элементы для остальных карточек
  <p key="rules">Список всех правил для проживания</p>,
  <p key="notifications">Настройте уведомления по вашему выбору</p>,
  <Button key="edit-profile" variant="info">
    Редактировать профиль
  </Button>,
  <p key="fines">Сумма штрафов: 500 руб.</p>,
  <Button key="shop" variant="success">
    Перейти в магазин
  </Button>,
  <p key="balance">Баланс: 1000 руб.</p>,
  <Button key="view-apartment" variant="warning">
    Посмотреть квартиру
  </Button>,
];

const Main = () => {
  return (
    <div>
      <Dashboard></Dashboard>
    </div>
  );
};

export default Main;
