import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { axiosReq } from "../../api/axiosDefaults";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsFeedPage.module.css";
import { useLocation } from "react-router-dom";

const PostsFeedPage = ({ message, filter = "" }) => {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axiosReq.get(`/posts-feed/?${filter}`);
                setPosts(data);
                setHasLoaded(True);
            } catch (err) {
                console.log(err);
            }
        };

        fetchPosts()
    }, [filter, pathname]);

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
