import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import styles from "../../styles/TutorialDetailPage.module.css";
import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Tutorial from "./Tutorial";
import TutorialCommentShareForm from "../tutorialcomments/TutorialCommentShareForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import TutorialComment from "../tutorialcomments/TutorialComment";
import TopProfiles from "../profiles/TopProfiles";
import InfiniteScroll from "react-infinite-scroll-component";

const TutorialDetailPage = () => {
    const { id } = useParams();
    const [tutorial, setTutorial] = useState({ results: [] });
    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [tutorialComments, setTutorialComments] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: tutorial }, { data: tutorialComments }] =
                    await Promise.all([
                        axiosReq.get(`/tutorials/${id}`),
                        axiosReq.get(`/tutorial-comments/?tutorial=${id}`),
                    ]);
                setTutorial({ results: [tutorial] });
                setTutorialComments(tutorialComments);
            } catch (err) {
                console.log(err);
            }
        };
        handleMount();
    }, [id]);

    return (
        <Container className="h-100">
            <Row className={`${styles.Row}`}>
                <Col className="py-2 p-0 p-lg-2" lg={8}>
                    <TopProfiles mobile />
                    <Tutorial
                        {...tutorial.results[0]}
                        setTutorials={setTutorial}
                        tutorialPage
                    />
                    <Container className={appStyles.Content}>
                        {currentUser ? (
                            <TutorialCommentShareForm
                                profile_id={currentUser.profile_id}
                                profileImage={profile_image}
                                tutorial={id}
                                setTutorial={setTutorial}
                                setTutorialComments={setTutorialComments}
                            />
                        ) : tutorialComments.results.length ? (
                            "Comments"
                        ) : null}
                        {tutorialComments.results.length ? (
                            tutorialComments.results.map((tutorialComment) => (
                                <InfiniteScroll
                                <TutorialComment
                                    key={tutorialComment.id}
                                    {...tutorialComment}
                                    setTutorial={setTutorial}
                                    setTutorialComments={setTutorialComments}
                                />
                            ))
                        ) : currentUser ? (
                            <span>
                                Be the first to comment on this tutorial
                            </span>
                        ) : (
                            <span>No comments yet...</span>
                        )}
                    </Container>
                </Col>
                <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <TopProfiles />
                </Col>
            </Row>
        </Container>
    );
};

export default TutorialDetailPage;
