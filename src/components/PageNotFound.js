import React from "react";
import styles from "../styles/PageNotFound.module.css";
import noResults from "../assets/nosearchresults.png";
import btnStyles from "../styles/Button.module.css";
import Container from "react-bootstrap/Container";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Asset from "./Asset";

const PageNotFound = () => {
	const history = useHistory();

	return (
		<Container className={styles.Container}>
			<Asset
				src={noResults}
				message={
					"Sorry, the page you're looking for has either moved or doesn't exist"
				}
			/>
			<Button
				className={`${btnStyles.Pink} ${btnStyles.Button} ${styles.GoBack}`}
				onClick={() => history.goBack()}
			>
				Go back
			</Button>
		</Container>
	);
};

export default PageNotFound;
