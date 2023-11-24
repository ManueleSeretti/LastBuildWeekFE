import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
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
        <h1>WELCOME</h1>

        <h4>Benvenuto nella homepage. Scegli cosa fare:</h4>

        <div className="d-flex justify-content-around">
          <Button onClick={() => navigate("/addClient")}>Aggiungi cliente</Button>
          <Button onClick={() => navigate("/clienti")}>Vedi clienti</Button>
          <Button onClick={() => navigate("/fatture")}>Fatture</Button>
        </div>
      </Container>
    </>
  );
};
export default Welcome;
