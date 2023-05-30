import React, { useState } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsFeedPage.module.css";

const PostsFeedPage = ({ message, filter = "" }) => {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false)

    return (
        <Container className={`${styles.homeBackground}`}>
            <Row>
                <Col lg={8}>
                    <p>Placeholder text 1</p>
                    <p>Post feed will go here</p>
                </Col>
                <Col className="d-lg-block d-none" lg={4}>
                    <p>Placeholder text 2</p>
                </Col>
            </Row>
        </Container>
    );
};

export default PostsFeedPage;
