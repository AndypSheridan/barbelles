import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import styles from "../../styles/TutorialDetailPage.module.css";
import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

const TutorialDetailPage = () => {
    const { id } = useParams();
    const [tutorial, setTutorial] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{data: tutorial}] = await Promise.all([
                    axiosReq.get(`/tutorials/${id}`)
                ])
                setTutorial({ results: [tutorial]})
                console.log(tutorial)
            } catch(err){
                console.log(err)
            }
        }
        handleMount();
    }, [id])

    return (
        <Container className="h-100">
            <Row className={`${styles.Row}`}>
                <Col className="py-2 p-0 p-lg-2" lg={8}>
                    <p>Placeholder 1</p>
                    <p>Tutorial component</p>
                    <Container className={appStyles.Content}>
                        Comments
                    </Container>
                </Col>
                <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                    Placeholder 2
                </Col>
            </Row>
        </Container>
    );
};

export default TutorialDetailPage;
