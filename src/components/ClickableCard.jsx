import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

const ClickableCard = ({ title, description, onClick }) => {
  return (
    <Card
      onClick={onClick}
      style={{
        cursor: "pointer", // Указывает, что элемент кликабельный
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <Card.Body className="text-center">
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

ClickableCard.propTypes = {
  title: PropTypes.string.isRequired, // title обязателен
  description: PropTypes.string, // description необязателен
  onClick: PropTypes.func.isRequired, // onClick обязателен
};

// Значения по умолчанию для необязательных пропсов
ClickableCard.defaultProps = {
  description: "Описание не указано",
};

export default ClickableCard;
