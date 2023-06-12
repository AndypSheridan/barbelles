import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import styles from "../../styles/SignUpForm.module.css";
import appStyles from "../../App.module.css";
import { Form, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";
import CustomButton from "../../components/CustomButton";
import { useRedirect } from "../../hooks/useRedirect";
import { Tabs, Tab } from "react-bootstrap";
import SignUp from "../../components/SignUp";
import SignIn from "../../components/SignIn";
import Welcome from "../../components/Welcome";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"

const SignUpForm = () => {
    const [currentForm, setCurrentForm] = useState("signup");
    const toggleForm = (formName) => {
        setCurrentForm(formName);
    };

    // useRedirect("loggedIn");
    // const [signUpData, setSignUpData] = useState({
    //     username: "",
    //     password1: "",
    //     password2: "",
    // });

    // const { username, password1, password2 } = signUpData;
    // const history = useHistory();
    // const [errors, setErrors] = useState({});

    // const handleChange = (event) => {
    //     setSignUpData({
    //         ...signUpData,
    //         [event.target.name]: event.target.value,
    //     });
    // };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         await axios.post("/dj-rest-auth/registration/", signUpData);
    //         history.push("/signin");
    //     } catch (err) {
    //         setErrors(err.response?.data);
    //     }
    // };

    return (
        <Container className={`${styles.SignUpBg}`}>
            <Row className={`${styles.Row} align-items-center`}>
                <Col className="ml-auto" md={6}>
                    {/* <ToastContainer /> */}
                    {/* <Container className="p-0 mx-auto">
                        <Form
                            onSubmit={handleSubmit}
                            className={`mx-auto ${styles.Form}`}
                        >
                            <Container className="mb-3 mx-auto text-center">
                                <Link to="/signin">
                                    <span className={styles.SignUpSpan}>
                                        Sign in |
                                    </span>
                                </Link>
                                <span> Sign up</span>
                            </Container>
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
                    {/* {errors.non_field_errors?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}
                        </Form>
                    </Container> */}
                    <Welcome />
                    {currentForm === "signup" ? (
                        <SignUp onFormSwitch={toggleForm} />
                    ) : (
                        <SignIn onFormSwitch={toggleForm} />
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default SignUpForm;
