import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import styles from "../../styles/SignUpForm.module.css";
import { Form, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";
import CustomButton from "../../components/CustomButton";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
    useRedirect("loggedIn");
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
                <Col className={`${styles.Col} d-none d-md-flex`} md={6}>
                    <Container className={`mx-auto my-auto p-0 `}>
                        <p className={`mx-auto ${styles.About}`}>
                            About us
                            <br />
                            <br />
                            Barbelles is an online fitness community for women
                            and we are committed to providing a friendly and
                            inclusive environment to learn, grow and share your
                            own fitness journeys.
                            <br />
                            Members can interact with our site content, follow
                            others, like posts and add tutorials to your
                            favourites section. We know everyone struggles for
                            motivation sometimes, but with our support, we can
                            all pull together to offer support and inspiration
                            to help you reach your fitness goals.
                            <br />
                            Whether you're a seasoned pro or never trained
                            before, we can provide something for everyone to
                            challenge themselves and reach that next level!
                        </p>
                    </Container>
                </Col>

                <Col md={6}>
                    <Container className="mb-3 text-center p-0 mx-auto">
                        <p className="mx-auto">
                            Just complete the form below to sign up!
                        </p>
                    </Container>
                    <Container className="p-0 mx-auto">
                        <Form
                            onSubmit={handleSubmit}
                            className={`mx-auto ${styles.Form}`}
                        >
                            <Form.Group controlId="username">
                                <Form.Label className="d-none">
                                    Username
                                </Form.Label>
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
                                <Form.Label className="d-none">
                                    Password
                                </Form.Label>
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

                            <CustomButton type="submit" title="Submit" />

                            {/* <Button variant="primary" type="submit">
                                Sign up
                            </Button> */}
                            {errors.non_field_errors?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}
                        </Form>
                    </Container>
                    <Container className="mt-3 p-0 mx-auto text-center">
                        <p className="mx-auto">
                            If you already have an account please{" "}
                            <Link to="/signin">
                                <span className={styles.SignUpSpan}>
                                    sign in
                                </span>
                            </Link>
                        </p>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUpForm;
