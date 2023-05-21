import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import styles from "../../styles/SignUpForm.module.css";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";
import signUpImage from "../../assets/signupimage.jpeg"


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
                <Col className={`d-none d-md-flex ${styles.Col}`} md={6}>
                    <Container className="mx-auto p-0">
                        <p className={`mx-auto ${styles.About}`}>
                            About us
                            <hr />
                            We are online fitness community for women 
                        </p>

                    </Container>
                </Col>

                <Col md={6}>
                    <Container className="mb-3 text-center p-0 mx-auto">
                        <p className="mx-auto">You can sign up for the community here...</p>
                    </Container>
                    <Container className="p-0 mx-auto">
                    <Form
                        onSubmit={handleSubmit}
                        className={`mx-auto ${styles.Form}`}
                    >
                        <Form.Group controlId="username">
                            <Form.Label className="d-none">Username</Form.Label>
                            <Form.Control
                                value={username}
                                onChange={handleChange}
                                type="text"
                                placeholder="Username"
                                name="username"
                            />
                        </Form.Group>
                        {errors.username?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <Form.Group controlId="password1">
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control
                                value={password1}
                                onChange={handleChange}
                                type="password"
                                placeholder="Password"
                                name="password1"
                            />
                        </Form.Group>
                        {errors.password1?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <Form.Group controlId="password2">
                            <Form.Label className="d-none">
                                Confirm password
                            </Form.Label>
                            <Form.Control
                                value={password2}
                                onChange={handleChange}
                                type="password"
                                placeholder="Confirm password"
                                name="password2"
                            />
                        </Form.Group>
                        {errors.password2?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <Button variant="primary" type="submit">
                            Sign up
                        </Button>
                        {errors.non_field_errors?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                    </Form>
                    </Container>
                    <Container className="mt-3 p-0 mx-auto text-center">
                    <p className="mx-auto">If you already have an account <Link to="/signin">
                             <span>please click here to sign in</span>
                        </Link></p>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUpForm;
