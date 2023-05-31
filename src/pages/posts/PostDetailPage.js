import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/PostDetailPage.module.css";
import CommentShareForm from "../comments/CommentShareForm";
import { axiosReq } from "../../api/axiosDefaults";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Post from "./Post";

const PostDetailPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: post }] = await Promise.all([
                    axiosReq.get(`/posts/${id}`),
                ]);
                setPost({ results: [post] });
                console.log(post);
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [id]);

    return (
        <Container className="h-100">
            <Row className={styles.Row}>
                <Col>
                    {currentUser ? (
                        <CommentShareForm
                            profile_id={currentUser.profile_id}
                            profile_image={profile_image}
                            post={id}
                            setPost={setPost}
                            setComments={setComments}
                        />
                    ) : comments.results.length ? (
                        "Comments"
                    ) : null}
                    <Post {...post.results[0]} setPosts={setPost} postPage />
                    <Container>Comments</Container>
                </Col>
                <Col className="d-lg-block d-none">
                    <p>More placeholder text</p>
                </Col>
            </Row>
        </Container>
    );
};

export default PostDetailPage;
