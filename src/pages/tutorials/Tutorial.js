import React from "react";
import styles from "../../styles/Tutorial.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

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
        tutorialDetailPage,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    return (
        <Card className={styles.Tutorial}>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={60} />
                        {owner}
                    </Link>
                    <div className="d-flex align-items-center">
                        <span>{updated_at}</span>
                        {is_owner && tutorialDetailPage && "..."}
                    </div>
                </Media>
            </Card.Body>
            <div className="embed-responsive embed-responsive-16by9">
                <iframe
                    src={video}
                    title="Tutorial"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
            </div>
        </Card>
    );
};

export default Tutorial;
