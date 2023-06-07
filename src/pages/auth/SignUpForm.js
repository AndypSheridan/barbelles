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

const SignUpForm = () => {
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
        <Container className={`${styles.SignUpBg} h-100`}>
            <Row className={`${styles.Row} align-items-center`}>
            <Col className="mx-auto" md={5}>
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
                    <SignUp />
                </Col>
                <Col md={7} className="mt-3">
                    <Container className={styles.About}>
                        <h2>Welcome to Barbelles</h2>
                        <p>
                            We are an online fitness community for women. It
                            doesn't matter whether you have never trained a day
                            in your life or whether you are a seasoned pro, you
                            are welcome here!
                        </p>
                        <p>
                            You can quickly create an account to start sharing
                            your fitness journey, take inspiration from other
                            users, follow their own stories and learn from our
                            ever-growing range of tutorials. You can tell us
                            more about yourself by adding to and editing your
                            profile.
                        </p>
                        <p>
                            You can interact with the community by adding
                            comments or asking questions in the site content.
                            However you choose to use the community, we are here
                            to provide a safe and friendly space to hit your goals and targets!
                        </p>
                    </Container>
                </Col>
                
            </Row>
        </Container>
    );
};

export default SignUpForm;
