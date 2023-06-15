import React, { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import {
    useCurrentUser,
    useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { toast } from "react-toastify";
import styles from "../../styles/UsernameEditForm.module.css";
import { useRedirect } from "../../hooks/useRedirect";

const UsernameEditForm = () => {
    useRedirect("loggedOut");
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState({});

    const history = useHistory();
    const { id } = useParams();

    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    useEffect(() => {
        if (currentUser?.profile_id?.toString() === id) {
            setUsername(currentUser.username);
        } else {
            history.push("/");
        }
    }, [currentUser, history, id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.put("/dj-rest-auth/user/", {
                username,
            });
            setCurrentUser((prevUser) => ({
                ...prevUser,
                username,
            }));
            history.goBack();
            toast.success("Username updated");
        } catch (err) {
            console.log(err);
            toast.error("Oops, please try again!");
            setErrors(err.response?.data);
        }
    };

    return (
        <Container className={styles.UsernameEditBgImage}>
            <Row className={appStyles.PaddingTop}>
                <Col className="py-2 mx-auto text-center" md={6}>
                    <Container className={appStyles.Content}>
                        <Form onSubmit={handleSubmit} className="my-2">
                            <Form.Group>
                                <h1 className="my-2">Change username</h1>
                                <Form.Control
                                    placeholder="username"
                                    type="text"
                                    value={username}
                                    onChange={(event) =>
                                        setUsername(event.target.value)
                                    }
                                />
                            </Form.Group>
                            {errors?.username?.map((message, idx) => (
                                <Alert key={idx} variant="warning">
                                    {message}
                                </Alert>
                            ))}
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Green}`}
                                onClick={() => history.goBack()}
                            >
                                Cancel
                            </Button>
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Pink}`}
                                type="submit"
                            >
                                Save
                            </Button>
                        </Form>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default UsernameEditForm;
