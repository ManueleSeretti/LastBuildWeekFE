import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { SET_TOKEN, setToken } from "../redux/actions";
import { Link, useNavigate } from "react-router-dom";

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
      <Row>
        <Col xs="4">
          <img
            src="https://i.pinimg.com/originals/9e/e2/af/9ee2af99c61296a8cd26a498be97d3b2.jpg"
            style={{ height: "100vh" }}
          />
        </Col>
        <Col xs="8" className="mt-5">
          <h1 className="mt-5">Epic Energy</h1>

          <Row className="justify-content-end mt-5">
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
                    type="password"
                    value={info.password}
                    onChange={(e) => changeInfo(e.target.value, "password")}
                    placeholder="inserisci un Password"
                  />
                </Form.Group>
                <div>
                  {" "}
                  <Button onClick={() => fetchLoginUser()}>Accedi</Button>
                  <Link to={"/signup"} className="ms-3">
                    Se non hai un account Registrati
                  </Link>
                </div>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
