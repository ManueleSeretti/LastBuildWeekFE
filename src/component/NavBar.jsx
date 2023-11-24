import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link to="/welcome">
          <img
            src="http://res.cloudinary.com/dk4czgntr/image/upload/v1700670391/gzaoyh3oxaor1xv92p7i.png"
            className="rounded-circle border shadow mx-3"
            width={80}
          />
        </Link>
        <Link to="/" className="navbar-brand">
          Epicode Energy
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/welcome" className="nav-link">
              Welcome
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
