import { Container, Row, Col, Image } from "react-bootstrap";
import ClickableCard from "./ClickableCard";
import "../App.css";

const Main = () => {
  return (
    <div className="custom-container">
      <div className="header m-2">
        <Image src="/together.png" alt="Логотип" className="logo" />
        <h1 className="header-title">ВМЕСТЕ</h1>
      </div>

      <Container fluid>
        <Row className="g-3 justify-content-center">
          {Array.from({ length: 8 }).map((_, index) => (
            <Col key={index} xs={12} sm={6} md={3}>
              <div className="card-wrapper">
                <ClickableCard
                  title={`Карточка ${index + 1}`}
                  description={`Описание для карточки ${index + 1}`}
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
