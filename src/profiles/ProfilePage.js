import React from "react";
import Container from "react-bootstrap/Container";
import Asset from "../components/Asset";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TopProfiles from "./TopProfiles";

const ProfilePage = () => {
    return (
        <Container>
            <Row>
                <Col>
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
            </Row>
        </Container>
    );
};

export default ProfilePage;
