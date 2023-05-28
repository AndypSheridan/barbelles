import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostDetailPage.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";

const PostDetailPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: post }] = await Promise.all([axiosReq.get(`/posts/${id}`),
              ])
              setPost({results: [post]})
              console.log(post)
            } catch (err) {
                console.log(err);
            }
        };

    handleMount()
    }, [id]);

    return (
        <Container className="h-100">
            <Row className={styles.Row}>
                <Col>
                    <p>Placeholder text</p>
                    <Post {...post.results[0]} setPosts={setPost} postPage />
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
