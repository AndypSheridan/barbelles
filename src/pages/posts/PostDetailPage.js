import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostDetailPage.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

const PostDetailPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: post }] = await Promise.all([axiosReq.get(``)]);
            } catch (err) {
                console.log(err);
            }
        };
    });

    return (
        <Container className="h-100">
            <Row className={styles.Row}>
                <Col>
                    <p>Placeholder text</p>
                    <p>Post component</p>
                    <Container>Comments</Container>
                </Col>
                <Col>
                    <p>More placeholder text</p>
                </Col>
            </Row>
        </Container>
    );
};

export default PostDetailPage;
