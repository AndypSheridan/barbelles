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
import PostComment from "../comments/PostComment";

const PostDetailPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: post }, { data: comments }] = await Promise.all([
                    axiosReq.get(`/posts/${id}`),
                    axiosReq.get(`/comments/?post=${id}`),
                ]);
                setPost({ results: [post] });
                setComments(comments);
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
                    <Post {...post.results[0]} setPosts={setPost} postPage />
                    <Container>
                        {currentUser ? (
                            <CommentShareForm
                                profile_id={currentUser.profile_id}
                                profileImage={profile_image}
                                post={id}
                                setPost={setPost}
                                setComments={setComments}
                            />
                        ) : comments.results.length ? (
                            "Comments"
                        ) : null}
                        {comments.results.length ? (
                            comments.results.map((comment) => (
                                <PostComment
                                    key={comment.id}
                                    {...comment}
                                    setPost={setPost}
                                    setComments={setComments}
                                />
                            ))
                        ) : currentUser ? (
                            <span>Be the first to comment!!</span>
                        ) : (
                            <span>No comments yet...</span>
                        )}
                    </Container>
                </Col>
                <Col className="d-lg-block d-none">
                    <p>More placeholder text</p>
                </Col>
            </Row>
        </Container>
    );
};

export default PostDetailPage;
