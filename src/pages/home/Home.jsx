import { Container, Row, Col, Button, Image } from "react-bootstrap";

function Home() {
  return (
    <div>
      {/* Шапка */}
      <header className="d-flex justify-content-between align-items-center p-3">
        <div className="d-flex align-items-center">
          <Image
            src="/together.png"
            alt="Логотип"
            width={40}
            height={40}
            className="me-2"
          />
          <h4 className="m-0">Вместе</h4>
        </div>
        <nav>
          <a href="#about" className="me-3 text-decoration-none text-dark">
            О нас
          </a>
          <a href="#contact" className="text-decoration-none text-dark">
            Контакты
          </a>
        </nav>
      </header>

      {/* Центральный блок */}
      <Container
        fluid
        className="text-center py-5 position-relative"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/main-page.jpg')", // Затемнение поверх картинки
          backgroundSize: "cover", // Растягиваем картинку
          backgroundPosition: "center", // Центруем картинку
          height: "100%", // Высота блока - весь экран
          color: "white", // Текст белого цвета
        }}
      >
        <Row className="justify-content-center align-items-center h-100">
          <Col md={6}>
            <h1>Планируйте совместную жизнь легко</h1>
            <p className="lead mt-3">
              Создавайте правила, голосуйте за изменения и поддерживайте порядок
              с помощью нашего приложения.
            </p>
            <div className="mt-4">
              <Button variant="primary" size="lg" className="me-3">
                Войти
              </Button>
              <Button variant="outline-light" size="lg">
                Зарегистрироваться
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Преимущества */}
      <Container className="py-5" id="about">
        <h2 className="text-center mb-4">Преимущества</h2>
        <Row>
          <Col md={4} className="text-center">
            <Image
              src="/create-rules.jpg"
              alt="Иконка 1"
              width={150}
              className="mb-3"
            />
            <h5>Создание правил</h5>
            <p>Легко создавайте гибкие правила для совместного проживания.</p>
          </Col>
          <Col md={4} className="text-center">
            <Image
              src="/votes.jpg"
              alt="Иконка 2"
              width={150}
              className="mb-3"
            />
            <h5>Голосование</h5>
            <p>Голосуйте за изменения и находите компромиссы.</p>
          </Col>
          <Col md={4} className="text-center">
            <Image
              src="/notify.jpg"
              alt="Иконка 3"
              width={150}
              className="mb-3"
            />
            <h5>Напоминания</h5>
            <p>Не забывайте об обязанностях с нашими умными напоминаниями.</p>
          </Col>
        </Row>
      </Container>

      {/* Футер */}
      <footer className="text-center py-4 bg-light" id="contact">
        <p className="mb-0">© 2024 Вместе. Все права защищены.</p>
        <p>
          <a href="/privacy" className="text-decoration-none text-dark">
            Политика конфиденциальности
          </a>{" "}
          |{" "}
          <a href="/terms" className="text-decoration-none text-dark">
            Условия использования
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Home;
