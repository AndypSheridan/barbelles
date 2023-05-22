import React from "react";
import { useHistory, Link } from "react-router-dom";
import styles from "../../styles/SignInForm.module.css";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";

const SignInForm = () => {
    return (
        <Container className={styles.signInBg}>
            <h1>Sign in</h1>
            <Row>
                <Col>
                    <Form className={`mx-auto ${styles.Form}`}>
                        <Form.Group controlId="username">
                            <Form.Label className="d-none">Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                name="username"
                            />
                        </Form.Group>

                        <Form.Group controlId="password1">
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password1"
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Sign up
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default SignInForm;
