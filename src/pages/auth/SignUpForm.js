import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import styles from "../../styles/SignUpForm.module.css";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";

const SignUpForm = () => {
    const [signUpData, setSignUpData] = useState({
        username: "",
        password1: "",
        password2: "",
    });

    const { username, password1, password2 } = signUpData;
    const history = useHistory();
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/dj-rest-auth/registration/", signUpData);
            history.push("/signin");
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <Container className={styles.SignUpBg}>
            <h1 className={styles.SignUpHeader}>Join our Community</h1>
            <Row className={styles.Row}>
                <Col className={`d-none d-md-block ${styles.Col}`} md={6}></Col>
                <Col md={6}>
                    <Form
                        onSubmit={handleSubmit}
                        className={`mx-auto ${styles.Form}`}
                    >
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                value={username}
                                onChange={handleChange}
                                type="text"
                                placeholder="Username"
                                name="username"
                            />
                        </Form.Group>
                        {errors.username?.map((message, index) => (
                            <Alert variant="warning" key={index}>
                                {message}
                            </Alert>
                        ))}

                        <Form.Group controlId="password1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                value={password1}
                                onChange={handleChange}
                                type="password"
                                placeholder="Password"
                                name="password1"
                            />
                        </Form.Group>
                        {errors.password1?.map((message, index) => (
                            <Alert variant="warning" key={index}>
                                {message}
                            </Alert>
                        ))}

                        <Form.Group controlId="password2">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control
                                value={password2}
                                onChange={handleChange}
                                type="password"
                                placeholder="Confirm password"
                            />
                        </Form.Group>
                        {errors.password2?.map((message, index) => (
                            <Alert variant="warning" key={index}>
                                {message}
                            </Alert>
                        ))}

                        <Button variant="primary" type="submit">
                            Sign up
                        </Button>
                        {errors.non_field_errors?.map((message, index) => (
                            <Alert variant="warning" key={index}>
                                {message}
                            </Alert>
                        ))}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUpForm;
