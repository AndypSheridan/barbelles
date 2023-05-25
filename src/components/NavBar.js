import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
// import NavbarBrand from "react-bootstrap/NavbarBrand";
import Navbar from "react-bootstrap/Navbar";
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
import { NavDropdown } from "react-bootstrap";

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    // const { expanded, setExpanded, ref } = useClickOutsideToggle();
    const [expanded, setExpanded] = useState(false);

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
                onClick={() => setExpanded(false)}
            >
                <i className="fa-solid fa-arrow-up-from-bracket"></i> Share post
            </NavLink>
            <NavLink
                to="/feed"
                className={styles.NavLink}
                activeClassName={styles.Active}
                onClick={() => setExpanded(false)}
            >
                <i className="fa-solid fa-list"></i> Feed
            </NavLink>

            <NavDropdown
                title={<Avatar src={currentUser?.profile_image} />}
                id="basic-nav-dropdown"
                alignRight
            >
                <NavDropdown.Item>
                    <NavLink
                        to={`profiles/${currentUser?.profile_id}`}
                        className={`${styles.NavLink} ${styles.AvatarNavLink}`}
                        activeClassName={styles.Active}
                        onClick={() => setExpanded(false)}
                    >
                        <Avatar
                            src={currentUser?.profile_image}
                            text="Profile"
                        />
                    </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                    <NavLink
                        to="/liked"
                        className={styles.NavLink}
                        activeClassName={styles.Active}
                        onClick={() => setExpanded(false)}
                    >
                        <i className="fa-solid fa-bookmark"></i> Liked content
                    </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                    <NavLink
                        to="/"
                        onClick={handleSignOut}
                        className={styles.NavLink}
                    >
                        <i className="fa-solid fa-door-open"></i> Log out
                    </NavLink>
                </NavDropdown.Item>
            </NavDropdown>
        </>
    );
    const signedOutIcons = (
        <>
            <NavLink
                to="/signin"
                className={styles.NavLink}
                activeClassName={styles.Active}
                onClick={() => setExpanded(false)}
            >
                <i className="fa-solid fa-arrow-right-to-bracket"></i> Sign in
            </NavLink>
            <NavLink
                to="/signup"
                className={styles.NavLink}
                activeClassName={styles.Active}
                onClick={() => setExpanded(false)}
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
                    // onClick={() => setExpanded(!expanded)}
                    // ref={ref}
                    aria-controls="basic-navbar-nav"
                    onClick={() => setExpanded(expanded ? false : "expanded")}
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-center">
                        <NavLink
                            exact
                            to="/"
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                            onClick={() => setExpanded(false)}
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
