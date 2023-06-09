import React from "react";
import styles from "../styles/About.module.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const About = () => {
    return (
        <Container className={styles.AboutContainer}>
            <h1 className={`${styles.AboutHeader} text-center`}>About our community</h1>
            <Row className={`${styles.AboutRow1} justify-content-center`}>
                <Col className={`${styles.AboutCol1}`} lg={6}></Col>
                <Col className={`${styles.AboutCol2}`}lg={6}></Col>
            </Row>
        </Container>
    );
};

export default About;
