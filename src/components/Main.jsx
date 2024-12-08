import { Container, Row, Col, Image } from "react-bootstrap";
import ClickableCard from "./ClickableCard";
import "../App.css";
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
                  title={`Карточка ${index + 1}`}
                  description={`Описание для карточки ${index + 1}`}
                  imageUrl={imageUrls[index]}
                  style={{
                    background: gradient,
                  }}
                  onClick={() => alert(`Вы нажали на карточку ${index + 1}`)}
                />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Main;
