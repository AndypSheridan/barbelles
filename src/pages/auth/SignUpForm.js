import React, { useState } from "react";
import styles from "../../styles/SignUpForm.module.css";
import Container from "react-bootstrap/Container";
import SignUp from "../../components/SignUp";
import SignIn from "../../components/SignIn";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/**
 * Renders home / sign-up / sign-in page.
 * Uses form toggle to switch between SignIn and SignUp components.
 */
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
