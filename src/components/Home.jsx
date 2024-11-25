import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const { loggedIn, email } = props;
  const navigate = useNavigate();

  const onButtonClick = () => {
    loggedIn ? props.setLoggedIn(false) : navigate("/login");
  };

  return (
    <div className="mainContainer">
      <div className={"titleContainer"}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={"buttonContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? "Log out" : "Log in"}
        />
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
      </div>
    </div>
  );
};

// Добавляем propTypes для валидации пропсов
Home.propTypes = {
  loggedIn: PropTypes.bool.isRequired, // loggedIn должен быть типа boolean и обязательным
  email: PropTypes.string, // email должен быть типа string, но не обязательным
  setLoggedIn: PropTypes.func,
};

export default Home;
