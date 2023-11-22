import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { SET_TOKEN, setToken } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [info, setInfo] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setInfo({
      email: "",
      password: "",
    });
  }, []);

  const changeInfo = (value, name) => {
    setInfo({ ...info, [name]: value });
  };

  const fetchLoginUser = async () => {
    try {
      const resp = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(info),
      });
      const data = await resp.json();
      dispatch(setToken(data));
      navigate("/welcome");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <h1>pagina login</h1>

      <Row className="justify-content-center">
        <Col xs="8">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Form.Group className="mb-3  text-start">
              <Form.Label column sm="2">
                E-mail
              </Form.Label>
              <Form.Control
                type="text"
                value={info.email}
                onChange={(e) => changeInfo(e.target.value, "email")}
                placeholder="inserisci un e-mail"
              />
            </Form.Group>
            <Form.Group className="mb-3  text-start">
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Form.Control
                type="text"
                value={info.password}
                onChange={(e) => changeInfo(e.target.value, "password")}
                placeholder="inserisci un Password"
              />
            </Form.Group>
            <Button onClick={() => fetchLoginUser()}>Accedi</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
