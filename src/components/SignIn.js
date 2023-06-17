import React, { useState } from "react";
import { useSetCurrentUser } from "../contexts/CurrentUserContext";
import CustomButton from "../components/CustomButton";
import styles from "../styles/SignInForm.module.css";
import btnStyles from "../styles/Button.module.css";
import { setTokenTimestamp } from "../utils/utils";
import { useRedirect } from "../hooks/useRedirect";
import Container from "react-bootstrap/Container";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import Welcome from "./Welcome";
import axios from "axios";

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
			history.push("/posts-feed");

			toast.success(`Signed in as ${username}`);
		} catch (err) {
			setErrors(err.response?.data);
			toast.error("Oops, please try again!");
		}
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit} className={`mx-auto ${styles.Form}`}>
				<Container className="mb-3 px-2 mx-auto text-center">
					<Welcome />
					<span className={styles.Span}> Sign in below or </span>
					<Button
						className={`${btnStyles.Button} ${btnStyles.Pink}`}
						onClick={() => props.onFormSwitch("signup")}
					>
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

				{errors.non_field_errors?.map((message, idx) => (
					<Alert className="mt-3" key={idx} variant="warning">
						{message}
					</Alert>
				))}
			</Form>
		</Container>
	);
};

export default SignIn;
