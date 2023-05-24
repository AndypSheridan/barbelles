import React from "react";
import Nav from "react-bootstrap/Nav";
// import NavbarBrand from "react-bootstrap/NavbarBrand";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import logo from "../assets/logo2.png";
import styles from "../styles/NavBar.module.css";
import {
    useCurrentUser,
    useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
        } catch (err) {
            console.log(err);
        }
    };

    const signedInIcons = (
        <>
            <NavLink
                to="/posts/create"
                className={styles.NavLink}
                activeClassName={styles.Active}
            >
                <i className="fa-solid fa-arrow-up-from-bracket"></i> Share post
            </NavLink>
            <NavLink
                to="/feed"
                className={styles.NavLink}
                activeClassName={styles.Active}
            >
                <i className="fa-solid fa-list"></i> Feed
            </NavLink>
            <NavLink
                to="/liked"
                className={styles.NavLink}
                activeClassName={styles.Active}
            >
                <i className="fa-solid fa-bookmark"></i> My stuff
            </NavLink>
            
            <NavLink
                to={`profiles/${currentUser?.profile_id}`}
                className={`${styles.NavLink} ${styles.AvatarNavLink}`}
                activeClassName={styles.Active}
            >
                <Avatar src={currentUser?.profile_image} text="Profile" />
            </NavLink>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavLink to="/" onClick={handleSignOut} className={styles.NavLink}>
                <i className="fa-solid fa-door-open"></i> Log out
            </NavLink>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
        </>
    );
    const signedOutIcons = (
        <>
            <NavLink
                to="/signin"
                className={styles.NavLink}
                activeClassName={styles.Active}
            >
                <i className="fa-solid fa-arrow-right-to-bracket"></i> Sign in
            </NavLink>
            <NavLink
                to="/signup"
                className={styles.NavLink}
                activeClassName={styles.Active}
            >
                <i className="fa-solid fa-plus"></i> Sign up
            </NavLink>
        </>
    );

    return (
        <Navbar
            className={styles.NavBar}
            expanded={expanded}
            expand="md"
            fixed="top"
        >
            <Container className={`mx-0 ${styles.NavBarContainer}`}>
                <NavLink to="/">
                    <Navbar.Brand className={styles.NavBarBrandText}>
                        <img src={logo} className={styles.Logo} alt="logo" />{" "}
                        BarBelles
                    </Navbar.Brand>
                </NavLink>

                {/* {currentUser && createPostIcon} */}

                <Navbar.Toggle
                    onClick={() => setExpanded(!expanded)}
                    ref={ref}
                    aria-controls="basic-navbar-nav"
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-center">
                        <NavLink
                            exact
                            to="/"
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                        >
                            <i className="fas fa-home"></i> Home
                        </NavLink>
                        {currentUser ? signedInIcons : signedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
