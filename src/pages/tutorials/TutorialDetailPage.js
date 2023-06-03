import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import styles from "../../styles/TutorialDetailPage.module.css"
import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";

const TutorialDetailPage = () => {

    const { id } =useParams();

    return (
        <Container className="h-100">
        <Row className={`${styles.Row}`}>
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <p>Placeholder 1</p>
                <p>Tutorial component</p>
                <Container className={appStyles.Content}>Comments</Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                Placeholder 2
            </Col>
        </Row>
        </Container>
    );
};

export default TutorialDetailPage;
