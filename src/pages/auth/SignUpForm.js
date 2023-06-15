import React, { useState } from "react";
import styles from "../../styles/SignUpForm.module.css";
import { Col, Row, Container } from "react-bootstrap";
import SignUp from "../../components/SignUp";
import SignIn from "../../components/SignIn";

const SignUpForm = () => {
    const [currentForm, setCurrentForm] = useState("signin");
    const toggleForm = (formName) => {
        setCurrentForm(formName);
    };

    return (
        <Container className={`${styles.SignUpBg}`}>
            <Row
                className={`${styles.Row} justify-content-start align-items-center`}
            >
                <Col md={6} className="mt-3">
                    {currentForm === "signup" ? (
                        <SignUp onFormSwitch={toggleForm} />
                    ) : (
                        <SignIn onFormSwitch={toggleForm} />
                    )}
                </Col>
                <Col md={6}></Col>
            </Row>
        </Container>
    );
};

export default SignUpForm;
