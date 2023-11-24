import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "./navBar";

const Welcome = () => {
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
  return (
    <>
      <NavBar />
      <Container>
        <h3 className="mt-2">Benvenuto nella homepage. Gestisci il tuo business</h3>

        <Row className="mt-3">
          <Col xs="6">
            <Card>
              <Card.Img
                variant="top"
                src="https://www.venditoreprofessionista.it/wp-content/uploads/2017/08/978-min-1.jpg"
              />
              <Card.Body>
                <Button onClick={() => navigate("/clienti")}>Vedi clienti</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs="6">
            <Card>
              <Card.Img
                variant="top"
                src="https://tse4.mm.bing.net/th?id=OIP.GIPTn-xQSbGYWfXxtUD3OAHaE7&pid=Api&P=0&h=180"
              />
              <Card.Body>
                <Button onClick={() => navigate("/fatture")}>Fatture</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Welcome;
