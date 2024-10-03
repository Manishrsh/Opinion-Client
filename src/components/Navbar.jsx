import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Col, Button } from "react-bootstrap";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { CiMedicalCross } from "react-icons/ci";
import { motion } from "framer-motion";

function Navbars() {
  const navigate = useNavigate();
  return (
    <>
    <motion.div
    initial={{y:-100}}
    animate={{y:0}}
    transition={{delay:5.0}}
    >
    <Navbar collapseOnSelect expand="lg" id="Wapper">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")}>
          React-Bootstrap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/news")}>news</Nav.Link>
            <Nav.Link onClick={()=>{navigate("/createpost")}} id="link"><CiMedicalCross />
            <span>Que</span></Nav.Link>
            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link  onClick={()=>{navigate("/response")}}>Responce</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
          <Col xs="auto">
            <Button className="LoginBtn" onClick={()=>{navigate("/login")}}>Login</Button>
          </Col>
          
          <lord-icon
    src="https://cdn.lordicon.com/xcxzayqr.json"
    trigger="hover"
    colors="primary:#e4e4e4,secondary:#08a88a"
    style={{width:'40px', height:'40px',marginleft:'20px'}}>
</lord-icon>
account
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </motion.div>
    </>
  );
}

export default Navbars;
