import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    <Container>
      <h1>WELCOME</h1>

      <p>Benvenuto nella homepage. Scegli cosa fare:</p>

      <Button onClick={() => navigate("/addClient")}>aggiungi cliente</Button>
    </Container>
  );
};
export default Welcome;