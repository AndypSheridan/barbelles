import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import styles from "../../styles/TutorialsFeedPage.module.css";
import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Tutorial from "./Tutorial";

const TutorialsFeedPage = ({ message, filter = "" }) => {
    const [tutorials, setTutorials] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchTutorials = async () => {
            try {
                const { data } = await axiosReq.get(`/tutorials/?${filter}`);
                setTutorials(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        setHasLoaded(false);
        fetchTutorials();
    }, [filter, pathname]);

    return (
        <Container className={`${styles.Container} h-100`}>
            <Row>
                <Col lg={8} className="p-0">
                    <p>PLaceholder 1</p>
                    {hasLoaded ? (
                        <>
                            {tutorials.results.length ? (
                                tutorials.map(tutorial => (
                                    <Tutorial />
                                ))
                            ) : (
                                console.log("Show no search results")
                            )}
                        </>
                    ) : (

                    )}
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
