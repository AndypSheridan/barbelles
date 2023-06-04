import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import styles from "../../styles/TutorialsFeedPage.module.css";
import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const TutorialsFeedPage = ({ message, filter = "" }) => {
    const [tutorials, setTutorials] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const fet
    })

    return (
        <Container className={`${styles.Container} h-100`}>
            <Row>
                <Col lg={8} className="p-0">
                    <p>PLaceholder 1</p>
                    <p>Tutorials</p>
                </Col>
                <Col lg={4} className="d-lg-block d-none p-0">
                    <p>Placeholder 2</p>
                </Col>
            </Row>
            <div>TutorialsFeedPage</div>
        </Container>
    );
};

export default TutorialsFeedPage;
