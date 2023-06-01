import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Container from "react-bootstrap/Container";
import TopProfiles from "./TopProfiles";
import Asset from "../components/Asset";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ProfilePage = () => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();

    useEffect(() => {
        setHasLoaded(true);
    }, []);

    const mainProfile = (
        <>
            <Row noGutters className="px-3 text-center">
                <Col className="text-lg-left" lg={3}>
                    <p>Image</p>
                </Col>
                <Col className="m-2" lg={6}>
                    <h4>Username</h4>
                    <p>Stats</p>
                </Col>
                <Col className="text-lg-right" lg={3}>
                    <p>Follow button</p>
                </Col>
                <Col className="p-3">
                    <p>Profile bio</p>
                </Col>
            </Row>
        </>
    );

    const mainProfilePosts = (
        <>
        <hr />
        <p className="text-center">Profile owner posts</p>
        <hr />
        </>
    )

    return (
        <Container>
            <Row>
                <Col className="py-2 p-0 p-lg-2" lg={8}>
                    <TopProfiles mobile />
                    <Container>
                        {hasLoaded ? (
                            <>
                                {mainProfile}
                                {mainProfilePosts}
                            </>
                        ) : (
                            <Asset spinner />
                        )}
                    </Container>
                </Col>
                <Col lg={4} className="d-none d-lg-block p-0 p-lg-2"></Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;
