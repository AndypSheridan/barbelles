import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useSetCurrentUser } from "../contexts/CurrentUserContext";
import axios from "axios";
import { NavLink } from "react-router-dom";
// import CustomButton from "../components/CustomButton"
// import { handleSignOut } from "../components/NavBar"

const SignOutModal = () => {
    const [show, setShow] = useState(false);

    const setCurrentUser = useSetCurrentUser();

    // const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
        } catch (err) {
            console.log(err);
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button
                variant="danger"
                className="mx-auto d-block"
                onClick={handleShow}
            >
                Sign out
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>Are you sure you want to sign out?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Not yet!
                    </Button>
                    
                    <NavLink to="/">
                    <Button variant="primary" onClick={handleSignOut}>
                        I'm sure!
                    </Button>
                    </NavLink>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SignOutModal;
