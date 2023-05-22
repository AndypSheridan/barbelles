import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import styles from "../../styles/SignInForm.module.css";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";

const SignInForm = () => {

    const [signInData, setSigninData] = useState({
        username: "",
        password: "",
    });

    const {username, password} = signInData;

    


    return (
        <Container className={styles.signInBg}>
            <h1 className={styles.SignInHeader}>Sign in</h1>
            <Row>
                <Col>
                    <Form className={`mx-auto ${styles.Form}`}>
                        <Form.Group controlId="username">
                            <Form.Label className="d-none">
                                Enter your username
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                name="username"
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control
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
