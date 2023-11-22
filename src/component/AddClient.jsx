import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddClient = () => {
  const [cliente, setCliente] = useState("");
  const [IndirizzoLegale, setIndirizzoLegale] = useState("");
  const [IndirizzoOperativo, Operativo] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setCliente({
      email: "",
      password: "",
    });
  }, []);

  const changeInfo = (value, name) => {
    setCliente({ ...cliente, [name]: value });
  };
  return (
    <Container>
      <h1>Aggiungi Cliente</h1>
      <Row className="justify-content-center">
        <Col xs="8">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Row>
              <Col xs="6">
                <Form.Group className="mb-3 text-start">
                  <Form.Label column sm="2">
                    Nome
                  </Form.Label>

                  <Form.Control
                    type="text"
                    value={info.nome}
                    onChange={(e) => changeInfo(e.target.value, "nome")}
                    placeholder="inserisci Nome"
                  />
                </Form.Group>
              </Col>
              <Col xs="6">
                <Form.Group className="mb-3  text-start">
                  <Form.Label column sm="2">
                    Cognome
                  </Form.Label>

                  <Form.Control
                    type="text"
                    value={info.cognome}
                    onChange={(e) => changeInfo(e.target.value, "cognome")}
                    placeholder="inserisci Cognome"
                  />
                </Form.Group>
              </Col>
              <Col xs="6">
                <Form.Group className="mb-3  text-start">
                  <Form.Label column sm="2">
                    Username
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={info.username}
                    onChange={(e) => changeInfo(e.target.value, "username")}
                    placeholder="inserisci Username"
                  />
                </Form.Group>
              </Col>
              <Col xs="6">
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
              </Col>
              <Col xs="6">
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
              </Col>
              <Button>Registrati</Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default AddClient;
