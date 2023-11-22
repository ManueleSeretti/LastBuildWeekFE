import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="d-flex justify-content-start align-items-center gap-5 py-3 bg-info">
        <img
          src="http://res.cloudinary.com/dk4czgntr/image/upload/v1700670391/gzaoyh3oxaor1xv92p7i.png"
          className="rounded-circle border shadow ms-3"
          width={80}
        />
        <h1>Home</h1>
      </div>
      <div className="mt-3">
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
      </div>
    </Container>
  );
};

export default Home;
