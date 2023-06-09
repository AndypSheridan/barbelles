import React from "react";
import styles from "../styles/About.module.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import communityImage from "../assets/community.jpg"

const About = () => {
    return (
        <Container className={styles.AboutContainer}>
            <h1 className={`${styles.AboutHeader} text-center`}>About our community</h1>
            <Row className={`${styles.AboutRow1} mt-3`}>
                <Col lg={6}> hi</Col>
                <Col lg={6}>
                    <img className={`${styles.AboutCol2Image} img-fluid`} src={communityImage} />
                </Col>
            </Row>
        </Container>
    );
};

export default About;
