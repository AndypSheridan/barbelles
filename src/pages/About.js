import React from "react";
import styles from "../styles/About.module.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import communityImage from "../assets/community3.jpg"

const About = () => {
    return (
        <Container className={styles.AboutContainer}>
            <h1 className={`${styles.AboutHeader} text-center`}>About our community</h1>
            <Row className={`${styles.AboutRow1} mt-4`}>
                <Col className={`${styles.AboutCol1} align text-center p-4`} lg={6}>
                    <Container className="align-items-center">
                <p>
                            We are an online fitness community for women. It
                            doesn't matter whether you have never trained a day
                            in your life or whether you are a seasoned pro, you
                            are welcome here!
                        </p>
                        <p>
                            You can quickly create an account to start sharing
                            your fitness journey, take inspiration from other
                            users, follow their own stories and learn from our
                            ever-growing range of tutorials. You can tell us
                            more about yourself by adding to and editing your
                            profile.
                        </p>
                        <p>
                            You can interact with the community by adding
                            comments or asking questions in the site content.
                            However you choose to use the community, we are here
                            to provide a safe and friendly space to hit your
                            goals and targets!
                        </p>
                        </Container>
                </Col>
                <Col className={`${styles.AboutCol2}`} lg={6}>
                    <img className={`${styles.AboutCol2Image} img-fluid`} src={communityImage} />
                    
                </Col>
            </Row>
            <Row className={`${styles.AboutRow1}`}>
            <Col className={`${styles.AboutCol2}`} lg={6}>
                    <img className={`${styles.AboutCol2Image} img-fluid`} src={communityImage} />
                    
                </Col>
                <Col className={`${styles.AboutCol1} align text-center p-4`} lg={6}>
                    <Container className="align-items-center">
                <p>
                            We are an online fitness community for women. It
                            doesn't matter whether you have never trained a day
                            in your life or whether you are a seasoned pro, you
                            are welcome here!
                        </p>
                        <p>
                            You can quickly create an account to start sharing
                            your fitness journey, take inspiration from other
                            users, follow their own stories and learn from our
                            ever-growing range of tutorials. You can tell us
                            more about yourself by adding to and editing your
                            profile.
                        </p>
                        <p>
                            You can interact with the community by adding
                            comments or asking questions in the site content.
                            However you choose to use the community, we are here
                            to provide a safe and friendly space to hit your
                            goals and targets!
                        </p>
                        </Container>
                </Col>
                
            </Row>
        </Container>
    );
};

export default About;
