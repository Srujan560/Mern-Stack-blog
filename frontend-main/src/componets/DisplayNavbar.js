import React from "react";
import { Nav, Container, Navbar } from "react-bootstrap";

export default function DisplayNavbar() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="https://st4.depositphotos.com/36771630/38221/v/600/depositphotos_382217332-stock-illustration-assassin-warrior-mascot-logo-gaming.jpg"
            height="100"
            alt="Logo of the page"
          />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home </Nav.Link>
            <Nav.Link href="/Create">Create </Nav.Link>
            <Nav.Link href="/Display">Display</Nav.Link>
            <Nav.Link href="/Login">Login</Nav.Link>
            <Nav.Link href="/Excuser">Excuser</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
