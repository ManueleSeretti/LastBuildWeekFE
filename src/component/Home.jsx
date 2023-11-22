import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <h1>Home</h1>
      <Button
        className="me-5"
        onClick={(e) => {
          e.preventDefault();
          navigate("/signup");
        }}
      >
        Registrati
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          navigate("/login");
        }}
      >
        Login
      </Button>
    </Container>
  );
};

export default Home;
