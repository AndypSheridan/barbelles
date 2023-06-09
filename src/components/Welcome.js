import React from "react";
import styles from "../styles/Welcome.module.css";
import Container from "react-bootstrap/Container";

/**
 * Welcome message displayed on home page, if logged out.
 */
const Welcome = () => {
	return (
		<Container className={`my-3 text-center`}>
			<h2 className={styles.Header}>
				Welcome to <span className={styles.WelcomeSpan}>Barbelles</span>
			</h2>
			<p className={styles.Paragraph}>
				An inclusive online fitness community for women
			</p>
		</Container>
	);
};

export default Welcome;
