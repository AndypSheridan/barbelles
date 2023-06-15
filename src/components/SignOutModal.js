import React, { useState } from "react";
import { useSetCurrentUser } from "../contexts/CurrentUserContext";
import { removeTokenTimestamp } from "../utils/utils";
import btnStyles from "../styles/Button.module.css";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "axios";

const SignOutModal = () => {
    const [show, setShow] = useState(false);

    const setCurrentUser = useSetCurrentUser();
    const history = useHistory();

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
                className={`${btnStyles.Button} ${btnStyles.Pink} ${btnStyles.SignOut} mx-auto d-block`}
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

                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Pink}`}
                            onClick={handleSignOut}
                        >
                            I'm sure!
                        </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SignOutModal;
