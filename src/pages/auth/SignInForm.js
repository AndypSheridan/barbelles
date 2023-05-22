import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "../../styles/SignInForm.module.css";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";

const SignInForm = () => {
    const [signInData, setSigninData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const { username, password } = signInData;
    const history = useHistory();

    const handleChange = (event) => {
        setSigninData({
            ...signInData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/dj-rest-auth/login/", signInData);
            history.push("/");
        } catch (err) {
            setErrors(err.response?.data)
        }
    };

    return (
        <Container className={styles.signInBg}>
            <h1 className={styles.SignInHeader}>Sign in</h1>
            <Row>
                <Col>
                    <Form
                        onSubmit={handleSubmit}
                        className={`mx-auto ${styles.Form}`}
                    >
                        <Form.Group controlId="username">
                            <Form.Label className="d-none">
                                Enter your username
                            </Form.Label>
                            <Form.Control
                                value={username}
                                onChange={handleChange}
                                type="text"
                                placeholder="Username"
                                name="username"
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control
                                value={password}
                                onChange={handleChange}
                                type="password"
                                placeholder="Password"
                                name="password"
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Sign in
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default SignInForm;
