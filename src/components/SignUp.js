import React, { useState } from "react";
import { Form, Container, Alert } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import CustomButton from "../components/CustomButton";
import styles from "../styles/SignUpForm.module.css";
import btnStyles from "../styles/Button.module.css";
import { useRedirect } from "../hooks/useRedirect";
import Button from "react-bootstrap/Button";
import Welcome from "./Welcome";
import axios from "axios";


const SignUp = (props) => {
    useRedirect("loggedIn");
    const [signUpData, setSignUpData] = useState({
        username: "",
        password1: "",
        password2: "",
    });

    const { username, password1, password2 } = signUpData;
    // const history = useHistory();
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
            toast.success("Signed up! Please sign in");
        } catch (err) {
            setErrors(err.response?.data);
            toast.error("Oops, please try again!");
        }
    };

    return (
        <Container className="px-2 mx-auto">
            <Form onSubmit={handleSubmit} className={`mx-auto ${styles.Form}`}>
                
                <Container className="mb-3 mx-auto text-center">
                <Welcome />
                    <span className={styles.Span}> Sign up below or </span>
                    <Button
                        className={`${btnStyles.Button} ${btnStyles.Pink}`}
                        onClick={() => props.onFormSwitch("signin")}
                    >
                        Sign in
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
