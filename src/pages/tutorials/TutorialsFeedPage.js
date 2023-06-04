import React from "react";
import Container from "react-bootstrap/Container";
import styles from "../../styles/TutorialsFeedPage.module.css";
import { Col, Row } from "react-bootstrap";

const TutorialsFeedPage = () => {
    return (
        <Container className={`${styles.Container} h-100`}>
            <Row>
                <Col >
                <p>PLaceholder 1</p>
                <p>Tutorials</p>
                </Col>
                <Col>
                <p>Placeholder 2</p>
                </Col>
            </Row>
            <div>TutorialsFeedPage</div>
        </Container>
    );
};

export default TutorialsFeedPage;
