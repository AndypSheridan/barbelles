import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useSetCurrentUser } from "../contexts/CurrentUserContext";
import axios from "axios";
import { NavLink, useHistory } from "react-router-dom";
import { removeTokenTimestamp } from "../utils/utils";
import { useRedirect } from "../hooks/useRedirect";
// import CustomButton from "../components/CustomButton"
// import { handleSignOut } from "../components/NavBar"
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import btnStyles from "../styles/Button.module.css";

const SignOutModal = () => {
    const [show, setShow] = useState(false);

    const setCurrentUser = useSetCurrentUser();
    const history = useHistory();

    // const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
            removeTokenTimestamp();
            history.push("/signup");
            toast.success("Logged out");
        } catch (err) {
            console.log(err);
            toast.error("Oops, please try again!");
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button
                variant="danger"
                className={`${btnStyles.Button} ${btnStyles.Pink} mx-auto d-block`}
                onClick={handleShow}
            >
                Sign out
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>Are you sure you want to sign out?</Modal.Body>
                <Modal.Footer>
                    <Button
                        className={`${btnStyles.Button} ${btnStyles.Dark}`}
                        onClick={handleClose}
                    >
                        Not yet!
                    </Button>

                    <NavLink to="/signup">
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Pink}`}
                            onClick={handleSignOut}
                        >
                            I'm sure!
                        </Button>
                    </NavLink>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SignOutModal;
