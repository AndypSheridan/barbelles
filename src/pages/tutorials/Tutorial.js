import React from "react";
import styles from "../../styles/Tutorial.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media } from "react-bootstrap";

const Tutorial = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        tutorial_comments_count,
        favourites_count,
        favourite_id,
        title,
        summary,
        video,
        updated_at,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    return <Card className={styles.Tutorial}>
        <Card.Body>
            <Media className="align-items-center justify-content-between">

            </Media>
        </Card.Body>

    </Card>
};

export default Tutorial;
