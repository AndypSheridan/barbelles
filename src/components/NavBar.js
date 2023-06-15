import React, { useState } from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Container from "react-bootstrap/Container";
import styles from "../styles/NavBar.module.css";
import { NavDropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import SignOutModal from "./SignOutModal";
import logo from "../assets/logo2.png";
import Nav from "react-bootstrap/Nav";
import Avatar from "./Avatar";

const NavBar = () => {
    const currentUser = useCurrentUser();
    const [expanded, setExpanded] = useState(false);

    const signedInIcons = (
        <>
            <NavLink className={styles.NavLink} to="/about">
                <i className="fa-solid fa-circle-info pl-3"></i>
                About
            </NavLink>
            <NavDropdown
                title={
                    <span>
                        <i className="fa-regular fa-image"></i>Posts
                    </span>
                }
                id="basic-nav-dropdown"
                className={`${styles.FeedsDropdown}`}
            >
                <NavLink
                    to="/posts"
                    className={`${styles.NavLink}`}
                    activeClassName={styles.Active}
                    onClick={() => setExpanded(false)}
                >
                    <i className="fa-solid fa-users"></i> All posts
                </NavLink>
                <NavLink
                    to="/posts-feed"
                    className={styles.NavLink}
                    activeClassName={styles.Active}
                    onClick={() => setExpanded(false)}
                >
                    <i className="fa-solid fa-user-group"></i> Following
                </NavLink>
                <NavLink
                    to="/posts/share"
                    className={styles.NavLink}
                    activeClassName={styles.Active}
                    onClick={() => setExpanded(false)}
                >
                    <i className="fa-solid fa-arrow-up-from-bracket"></i> Share
                    post
                </NavLink>
                <NavLink
                    to="/liked"
                    className={styles.NavLink}
                    activeClassName={styles.Active}
                    onClick={() => setExpanded(false)}
                >
                    <i className="fa-solid fa-bookmark"></i> Liked
                </NavLink>
            </NavDropdown>

            <NavDropdown
                alignRight
                title={
                    <span>
                        <i className="fa-solid fa-graduation-cap"></i>Tutorials
                    </span>
                }
                id="basic-nav-dropdown"
                className={styles.FeedsDropdown}
            >
                <NavLink
                    to="/tutorials"
                    className={styles.NavLink}
                    activeClassName={styles.Active}
                    onClick={() => setExpanded(false)}
                >
                    <i className="fa-solid fa-list"></i> Tutorials
                </NavLink>

                {currentUser?.profile_is_staff === true && (
                    <NavLink
                        to="/tutorials/share"
                        className={styles.NavLink}
                        activeClassName={styles.Active}
                        onClick={() => setExpanded(false)}
                    >
                        <i className="fa-solid fa-arrow-up-from-bracket"></i>{" "}
                        Share tutorial
                    </NavLink>
                )}

                <NavLink
                    to="/favourited"
                    className={styles.NavLink}
                    activeClassName={styles.Active}
                    onClick={() => setExpanded(false)}
                >
                    <i className="fa-solid fa-bookmark"></i> Favourites
                </NavLink>
            </NavDropdown>

            <NavDropdown
                title={<Avatar src={currentUser?.profile_image} />}
                id="basic-nav-dropdown"
                alignRight
                className={styles.ProfileDropdown}
            >
                <NavLink
                    to={`/profiles/${currentUser?.profile_id}`}
                    className={`${styles.NavLink} ${styles.AvatarNavLink}`}
                    activeClassName={styles.Active}
                    onClick={() => setExpanded(false)}
                >
                    <Avatar src={currentUser?.profile_image} text="Profile" />
                </NavLink>

                <SignOutModal />
            </NavDropdown>
        </>
    );
    const signedOutIcons = (
        <>
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
                {currentUser ? (
                    <NavLink to="/">
                        <Navbar.Brand className={styles.NavBarBrandText}>
                            <img
                                src={logo}
                                className={styles.Logo}
                                alt="logo"
                            />{" "}
                            BarBelles
                        </Navbar.Brand>
                    </NavLink>
                ) : (
                    <Navbar.Brand className={styles.NavBarBrandText}>
                        <img src={logo} className={styles.Logo} alt="logo" />{" "}
                        BarBelles
                    </Navbar.Brand>
                )}

                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    onClick={() => setExpanded(expanded ? false : "expanded")}
                    className="text-right"
                />
                <Navbar.Collapse id="basic-navbar-nav" className="text-right">
                    <Nav className="ml-auto text-right">
                        {currentUser ? signedInIcons : signedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
