import React, { useState } from "react";
import {
    useCurrentUser,
    useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import { Form, Col, Row, Container, Alert } from "react-bootstrap";
import CustomButton from "../components/CustomButton";
import styles from "../styles/SignInForm.module.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useRedirect } from "../hooks/useRedirect";
import { setTokenTimestamp } from "../utils/utils";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import appStyles from "../App.module.css";
import Welcome from "./Welcome";
import btnStyles from "../styles/Button.module.css"

const SignIn = (props) => {
    const setCurrentUser = useSetCurrentUser();

    useRedirect("loggedIn");

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
            const { data } = await axios.post(
                "/dj-rest-auth/login/",
                signInData
            );
            setCurrentUser(data.user);
            setTokenTimestamp(data);
            history.goBack();

            toast.success(`Signed in as ${username}`, {
                progressStyle: { background: "#b27092" },
                bodyClassName: { color: "#f4bfdb" },
            });
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        // <Container className={styles.signInBg}>
        //     <h1 className={styles.SignInHeader}>Sign in</h1>

        //     <Row className="text-center">
        //         <Col className="mx-auto" md={6}>
        //             <Container className="my-3">
        //                 <span>Sign in |</span>
        //                 <Link to="/signup">
        //                     <span className="text-center"> Sign up</span>
        //                 </Link>
        //             </Container>
        <Container>
            <Form onSubmit={handleSubmit} className={`mx-auto ${styles.Form}`}>
                <Container className="mb-3 mx-auto text-center">
                    <Welcome />
                    <span> Sign in below or </span>
                    <Button className={`${btnStyles.Button} ${btnStyles.Pink}`} onClick={() => props.onFormSwitch("signup")}>
                        Sign Up
                    </Button>
                </Container>
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
                {errors.username?.map((message, idx) => (
                    <Alert key={idx} variant="warning">
                        {message}
                    </Alert>
                ))}

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
                {errors.password?.map((message, idx) => (
                    <Alert key={idx} variant="warning">
                        {message}
                    </Alert>
                ))}

                <CustomButton type="submit" title="Submit" />

                {/* <Button className={buttonstyles.Button} type="submit">
                            Sign in
                        </Button> */}
                {errors.non_field_errors?.map((message, idx) => (
                    <Alert className="mt-3" key={idx} variant="warning">
                        {message}
                    </Alert>
                ))}
            </Form>
        </Container>
        //         </Col>
        //     </Row>
        // </Container>
    );
};

export default SignIn;
