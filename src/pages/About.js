import React from "react";
import styles from "../styles/About.module.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import communityImage2 from "../assets/community3.jpg";
import communityImage1 from "../assets/community4.jpg";
import communityImage3 from "../assets/kateross.jpg";
import communityImage5 from "../assets/community5.jpg";
import communityImage6 from "../assets/community6.jpg";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <Container className={styles.AboutContainer}>
            <h1 className={`${styles.AboutHeader} text-center`}>
                About our community
            </h1>
            <Row className={`${styles.AboutRow1} mt-4`}>
                <Col className={`${styles.AboutCol2}`} lg={4}>
                    <img
                        className={`${styles.AboutCol2Image} img-fluid`}
                        src={communityImage1}
                    />
                </Col>
                <Col
                    className={`${styles.AboutCol1} d-flex align-items-center align text-center p-4`}
                    lg={4}
                >
                    <Container className="align-items-center">
                        <h2>BarBelles...?</h2>
                        <p>
                            Yes, BarBelles! We think it's a clever play on words
                            but we are also an online fitness community for
                            women! Whether you have never trained a day in your
                            life, or you're a seasoned pro, our mission
                            statement is to provide a safe, inspiring and fun
                            space for you to share your own fitness journey.
                            Bought a fresh pair of trainers?{" "}
                            <Link to="/posts/share">Share it!</Link> Just made
                            the school run exactly that?{" "}
                            <Link to="/posts/share">Share it!</Link>
                        </p>
                    </Container>
                </Col>
                <Col className={`${styles.AboutCol2}`} lg={4}>
                    <img
                        className={`${styles.AboutCol2Image} img-fluid`}
                        src={communityImage5}
                    />
                </Col>
            </Row>
            <Row className={`${styles.AboutRow1}`}>
                <Col
                    className={`${styles.AboutCol1} d-flex align-items-center align text-center p-4`}
                    lg={4}
                >
                    <Container className="align-items-center">
                        <h2>What else can I do?</h2>
                        <p>
                            Struggling for inspiration? Check out the tutorials
                            section. You can bookmark tutorials so they appear
                            in the 'Saved' section of the navbar. We are always
                            adding new content so if nothing ignites that fire,
                            check back again regularly!
                        </p>
                        <p>
                            Follow other users! You can easily follow other
                            users and like their posts! Posts you have liked
                            will be saved in the 'Liked' tab in the navbar so
                            you can easily find them again! You can also comment
                            on their posts.
                        </p>
                    </Container>
                </Col>
                <Col className={`${styles.AboutCol2}`} lg={4}>
                    <img
                        className={`${styles.AboutCol2Image} img-fluid`}
                        src={communityImage3}
                    />
                </Col>
                <Col
                    className={`${styles.AboutCol1} d-flex align-items-center align text-center p-4`}
                    lg={4}
                >
                    <Container className="align-items-center">
                        <h2>What else can I do?</h2>
                        <p>
                            Struggling for inspiration? Check out the tutorials
                            section. We are always adding new content so if
                            nothing ignites that fire, check back again
                            regularly!
                        </p>
                        <p>
                            Follow other users! You can easily follow other
                            users and like their posts! Posts you have liked
                            will be saved in the 'Liked' tab in the navbar so
                            you can easily find them again! You can also comment
                            on their posts.
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
            <Row className={`${styles.AboutRow1}`}>
                <Col className={`${styles.AboutCol2}`} lg={4}>
                    <img
                        className={`${styles.AboutCol2Image} img-fluid`}
                        src={communityImage2}
                    />
                </Col>
                <Col
                    className={`${styles.AboutCol1} align text-center p-4`}
                    lg={4}
                >
                    <Container className="align-items-center">
                        <h2>Follow us...</h2>
                    </Container>
                </Col>
                <Col className={`${styles.AboutCol2}`} lg={4}>
                    <img
                        className={`${styles.AboutCol2Image} img-fluid`}
                        src={communityImage6}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default About;
