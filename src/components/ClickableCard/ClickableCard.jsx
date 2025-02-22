import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

const ClickableCard = ({ title, onClick, style, imageUrl, children }) => {
  return (
    <Card
      onClick={onClick}
      style={{
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        border: "none",
        position: "relative", // Добавляем позиционирование для карточки
        ...style,
      }}
      className="clickable-card"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
      }}
    >
      {/* Если imageUrl передан, отображаем изображение в центре под текстом */}
      {imageUrl && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "7rem",
            height: "7rem",
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.2, // Регулирует прозрачность, чтобы текст был видимым
            zIndex: 0,
          }}
        />
      )}
      {/* Добавляем картинку в правом верхнем углу */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Card image"
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
            width: "2.5rem", // Размер изображения
            height: "2.5rem",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        />
      )}
      <Card.Body className="text-center">
        <Card.Title
          className="clickable-card-title"
          style={{ color: "#fff", textAlign: "left", fontSize: "1.5rem" }}
        >
          {title}
        </Card.Title>
        <div
          className="clickable-card-content"
          style={{ textAlign: "left", color: "#fff" }}
        >
          {children}
        </div>
      </Card.Body>
    </Card>
  );
};

ClickableCard.propTypes = {
  title: PropTypes.string.isRequired, // title обязателен
  description: PropTypes.string, // description необязателен
  onClick: PropTypes.func.isRequired, // onClick обязателен
  style: PropTypes.object, // Дополнительные стили
  imageUrl: PropTypes.string, // URL картинки (необязателен)
  children: PropTypes.node, // Динамический контент
};

// Значения по умолчанию для необязательных пропсов
ClickableCard.defaultProps = {
  description: "Описание не указано",
  style: {}, // Значение по умолчанию для стиля
  imageUrl: "", // Значение по умолчанию для картинки
};

export default ClickableCard;
