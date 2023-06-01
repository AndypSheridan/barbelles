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
    }, [])

    const mainProfile = (
        <>
        <Row>
            <Col>
            </Col>
            <Col>
            </Col>
            <Col>
            </Col><Col>
            </Col>
        </Row>
        </>
    )

    return (
        <Container>
            <Row>
                <Col lg={8}>
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
                <Col lg={4} className="d-none d-lg-block">
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;
