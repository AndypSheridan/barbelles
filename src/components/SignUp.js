import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import styles from "../styles/SignUpForm.module.css";
import appStyles from "../App.module.css";
import { Form, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import { useRedirect } from "../hooks/useRedirect";
import { Tabs, Tab } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import btnStyles from "../styles/Button.module.css"
import { ToastContainer, toast } from "react-toastify";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"

const SignUp = (props) => {
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
            // history.push("/signup");
            props.onFormSwitch("signin");
            toast.success("Signed up! Please sign in")
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <Container className="p-0 mx-auto">
            <Form onSubmit={handleSubmit} className={`mx-auto ${styles.Form}`}>
                <Container className="mb-3 mx-auto text-center">
                    <span> Sign up here or </span>
                    <Button className={btnStyles.Button} onClick={() => props.onFormSwitch("signin")}>
                        <span className={styles.SignUpSpan}>Sign in</span>
                    </Button>
                </Container>
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
                    <Form.Label className="d-none">Confirm password</Form.Label>
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
                <ToastContainer />

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
    );
};

export default SignUp;
