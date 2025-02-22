import { Container, Row, Col, Image, Button } from "react-bootstrap";
import ClickableCard from "../../components/ClickableCard/ClickableCard";
import "../../App.css";
import "./Main.css";

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
    <div className="custom-container">
      <div className="header m-2">
        <Image src="/together.png" alt="Логотип" className="logo" />
        <h1 className="header-title">ВМЕСТЕ</h1>
      </div>

      <Container fluid>
        <Row className="g-3 justify-content-center">
          {gradients.map((gradient, index) => (
            <Col key={index} xs={12} sm={6} md={3}>
              <div className="card-wrapper">
                <ClickableCard
                  title={blockNames[index]}
                  imageUrl={imageUrls[index]}
                  style={{
                    background: gradient,
                  }}
                  onClick={() => alert(`Вы нажали на карточку ${index + 1}`)}
                >
                  {cardContents[index]}
                </ClickableCard>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Main;
