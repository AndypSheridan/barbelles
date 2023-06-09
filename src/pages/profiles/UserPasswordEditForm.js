import React, { useEffect, useState } from "react";
import styles from "../../styles/UserPasswordEditForm.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useHistory, useParams } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import { useRedirect } from "../../hooks/useRedirect";
import { axiosRes } from "../../api/axiosDefaults";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const UserPasswordEditForm = () => {
	useRedirect("loggedOut");
	const history = useHistory();
	const { id } = useParams();
	const currentUser = useCurrentUser();

	const [userData, setUserData] = useState({
		new_password1: "",
		new_password2: "",
	});
	const { new_password1, new_password2 } = userData;

	const [errors, setErrors] = useState({});

	const handleChange = (event) => {
		setUserData({
			...userData,
			[event.target.name]: event.target.value,
		});
	};

	useEffect(() => {
		if (currentUser?.profile_id?.toString() !== id) {
			// redirect user if they are not the owner of this profile
			history.push("/");
		}
	}, [currentUser, history, id]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await axiosRes.post("/dj-rest-auth/password/change/", userData);
			history.goBack();
			toast.success("Password updated");
		} catch (err) {
			toast.error("Oops, please try again!");
			setErrors(err.response?.data);
		}
	};

	return (
		<Container className={styles.PasswordEditBgImage}>
			<Row className={appStyles.PaddingTop}>
				<Col className="py-2 mx-auto text-center" md={6}>
					<Container className={appStyles.Content}>
						<Form onSubmit={handleSubmit}>
							<h1 className={`${styles.TextBrown}my-2`}>
								Change Password
							</h1>
							<Form.Group>
								<Form.Label className={styles.TextDarkPink}>
									New password
								</Form.Label>
								<Form.Control
									placeholder="new password"
									type="password"
									value={new_password1}
									onChange={handleChange}
									name="new_password1"
								/>
							</Form.Group>
							{errors?.new_password1?.map((message, idx) => (
								<Alert key={idx} variant="warning">
									{message}
								</Alert>
							))}
							<Form.Group>
								<Form.Label className={styles.TextDarkPink}>
									Confirm password
								</Form.Label>
								<Form.Control
									placeholder="confirm new password"
									type="password"
									value={new_password2}
									onChange={handleChange}
									name="new_password2"
									className="text-center"
								/>
							</Form.Group>
							{errors?.new_password2?.map((message, idx) => (
								<Alert key={idx} variant="warning">
									{message}
								</Alert>
							))}
							<Button
								className={`${btnStyles.Button} ${btnStyles.Green}`}
								onClick={() => history.goBack()}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								className={`${btnStyles.Button} ${btnStyles.Pink}`}
							>
								Save
							</Button>
						</Form>
					</Container>
				</Col>
			</Row>
		</Container>
	);
};

export default UserPasswordEditForm;
