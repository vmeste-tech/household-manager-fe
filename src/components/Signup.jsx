import { Form, Button } from "react-bootstrap";

function SignUp() {
  return (
    <Form
      style={{
        minWidth: "350px",
        maxWidth: "400px",
        width: "100%",
      }}
    >
      <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
        <Form.Label>Имя</Form.Label>
        <Form.Control type="text" placeholder="Введите ваше имя" />
      </Form.Group>

      <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
        <Form.Label>Фамилия</Form.Label>
        <Form.Control placeholder="Введите вашу фамилию" />
      </Form.Group>

      <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
        <Form.Label>Адрес электронной почты</Form.Label>
        <Form.Control
          type="email"
          placeholder="Введите адрес электронной почты"
        />
      </Form.Group>

      <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
        <Form.Label>Пароль</Form.Label>
        <Form.Control type="password" placeholder="Введите пароль" />
      </Form.Group>

      <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Подтвердите пароль" />
      </Form.Group>

      <Form.Group className="mb-3 text-start" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Оставаться в системе" />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100">
        Зарегистрироваться
      </Button>
    </Form>
  );
}

export default SignUp;
