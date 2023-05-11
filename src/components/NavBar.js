import React from "react";
import Nav from "react-bootstrap/Nav";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Navbar from "react-bootstrap/Navbar";
import NavLink from "react-bootstrap/NavLink";
import Container from "react-bootstrap/Container";
import logo from "../assets/logo.png"
import styles from "../styles/NavBar.module.css"


const NavBar = () => {
    return (
        <Navbar className={styles.NavBar} expand="md" fixed="top">
            <Container>
                <Navbar.Brand><img src={logo} alt="logo" /> BarBelles</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        <Nav.Link><i className="fas fa-home"></i> Home</Nav.Link>
                        <Nav.Link><i className="fa-solid fa-arrow-right-to-bracket"></i> Sign in</Nav.Link>
                        <Nav.Link><i className="fa-solid fa-plus"></i> Sign up</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
