import React from "react";
import styles from "../styles/Welcome.module.css";
import Container from "react-bootstrap/Container";

const Welcome = () => {
    return (
        <Container className={`my-3 text-center`}>
            <h2 className={styles.Header}>Welcome to <span className={styles.WelcomeSpan}>Barbelles</span></h2>
        </Container>
    );
};

export default Welcome;
