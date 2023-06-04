import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import styles from "../../styles/TutorialsFeedPage.module.css";
import { Col, Form, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Tutorial from "./Tutorial";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import NoSearchResults from "../../assets/nosearchresults.png";
import InfiniteScroll from "react-infinite-scroll-component";

const TutorialsFeedPage = ({ message, filter = "" }) => {
    const [tutorials, setTutorials] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchTutorials = async () => {
            try {
                const { data } = await axiosReq.get(`/tutorials/?${filter}search=${query}`);
                setTutorials(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        setHasLoaded(false);
        
        const searchTimer = setTimeout(() => {
            fetchTutorials();
        }, 1200)
        return () => {
            clearTimeout(searchTimer)
        }

        fetchTutorials();
    }, [filter, query, pathname]);

    return (
        <Container className={`${styles.Container} h-100`}>
            <Row>
                <Col lg={8} className="p-0">
                    <p>PLaceholder 1</p>
                    <i className={`fas fa-search ${styles.SearchIcon}`} />
                    <Form
                        className={styles.SearchBar}
                        onSubmit={(event) => event.preventDefault()}
                    >
                        <Form.Control
                            type="text"
                            className="mr-sm-2"
                            placeholder="Search tutorials"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                    </Form>
                    {hasLoaded ? (
                        <>
                            {tutorials.results.length ? (
                                <InfiniteScroll></InfiniteScroll>
                                tutorials.results.map((tutorial) => (
                                    <Tutorial
                                        key={tutorial.id}
                                        {...tutorial}
                                        setTutorials={setTutorials}
                                    />
                                ))
                            ) : (
                                <Container className={appStyles.Content}>
                                    <Asset
                                        src={NoSearchResults}
                                        message={message}
                                    />
                                </Container>
                            )}
                        </>
                    ) : (
                        <Container className={appStyles.Content}>
                            <Asset spinner />
                        </Container>
                    )}
                </Col>
                <Col lg={4} className="d-lg-block d-none p-0">
                    <p>Placeholder 2</p>
                </Col>
            </Row>
        </Container>
    );
};

export default TutorialsFeedPage;
