import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "../../styles/PostDetailPage.module.css";
import CommentShareForm from "../comments/CommentShareForm";
import { useRedirect } from "../../hooks/useRedirect";
import { axiosReq } from "../../api/axiosDefaults";
import PostComment from "../comments/PostComment";
import Container from "react-bootstrap/Container";
import { fetchMoreData } from "../../utils/utils";
import TopProfiles from "../profiles/TopProfiles";
import { useParams } from "react-router-dom";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Post from "./Post";

const PostDetailPage = () => {
    useRedirect("loggedOut");
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
        <Container>
            <Row className={styles.Row}>
                <Col lg={8}>
                    <TopProfiles mobile />
                    <Post {...post.results[0]} setPosts={setPost} postPage />
                    <Container className={`${appStyles.Content} mb-4`}>
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
                            <InfiniteScroll
                                children={comments.results.map((comment) => (
                                    <PostComment
                                        key={comment.id}
                                        {...comment}
                                        setPost={setPost}
                                        setComments={setComments}
                                    />
                                ))}
                                dataLength={comments.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!comments.next}
                                next={() =>
                                    fetchMoreData(comments, setComments)
                                }
                            />
                        ) : currentUser ? (
                            <span className={styles.NoComments}>
                                Be the first to comment!!
                            </span>
                        ) : (
                            <span className={styles.NoComments}>
                                No comments yet...
                            </span>
                        )}
                    </Container>
                </Col>
                <Col className="d-lg-block d-none" lg={4}>
                    <TopProfiles />
                </Col>
            </Row>
        </Container>
    );
};

export default PostDetailPage;
