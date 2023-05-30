import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { axiosReq } from "../../api/axiosDefaults";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsFeedPage.module.css";
import { useLocation } from "react-router-dom";
import Post from "./Post";
import NoSearchResults from "../../assets/nosearchresults.png"
import Asset from "../../components/Asset";

const PostsFeedPage = ({ message, filter = "" }) => {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/?${filter}`);
                setPosts(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };

        setHasLoaded(false);
        fetchPosts();
    }, [filter, pathname]);

    return (
        <Container className={`${styles.homeBackground}`}>
            <Row>
                <Col className={styles.Col} lg={8}>
                    <p>Placeholder text 1</p>

                    <i className={`fas fa-search ${styles.SearchIcon}`} />

                    {hasLoaded ? (
                        <>
                        {posts.results.length ? (
                            posts.results.map( post => (
                                <Post key={post.id} {...post} setPosts={setPosts} />
                            ))
                        ) : <Container>
                            <Asset src={NoSearchResults} message={message} />
                        </Container>
                        }
                        </>
                    ) : (
                        <Container>
                            <Asset spinner />
                        </Container>
                    )}
                </Col>
                <Col className="d-lg-block d-none" lg={4}>
                    <p>Placeholder text 2</p>
                </Col>
            </Row>
        </Container>
    );
};

export default PostsFeedPage;
