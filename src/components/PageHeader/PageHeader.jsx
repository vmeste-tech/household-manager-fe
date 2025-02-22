import "./PageHeader.css";
import PropTypes from "prop-types";

const PageHeader = ({ title, icon, gradientStart, gradientEnd }) => {
  return (
    <header className="header">
      <div
        className="gradient-box"
        style={{
          background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`,
        }}
      >
        <span className="title">{title}</span>
        <img src={icon} alt="icon" className="header-icon" />
      </div>
    </header>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  gradientStart: PropTypes.string.isRequired,
  gradientEnd: PropTypes.string.isRequired,
};

export default PageHeader;
