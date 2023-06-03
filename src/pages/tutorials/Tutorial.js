import React from "react";
import styles from "../../styles/Tutorial.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { axiosRes } from "../../api/axiosDefaults";


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

    const handleFavourite = async () => {
        try {
            const { data } = await axiosRes
        }
    }

    return (
        <Card className={styles.Tutorial}>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={60} />
                        {owner}
                    </Link>
                    <div className="d-flex align-items-center">
                        <span><Link to={`/tutorials/${id}`}>View tutorial | </Link> {updated_at}</span> | 
                        
                        {is_owner && tutorialDetailPage && "..."}
                    </div>
                </Media>
            </Card.Body>
            <div className="embed-responsive embed-responsive-16by9">
                <iframe
                    src={video}
                    title="Tutorial"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
            </div>
            <Card.Body>
                {title && <Card.Title className="text-center">{title}</Card.Title>}
                {summary && <Card.Text>{summary}</Card.Text>}
                <div className={styles.TutorialInteraction}>
                {is_owner ? (
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>You can't like your own Tutorial!</Tooltip>
                            }
                        >
                            <i className="far fa-heart" />
                        </OverlayTrigger>
                    ) : favourite_id ? (
                        <span onClick={()=>{}}>
                            <i className="fas fa-heart" />
                        </span>
                    ) : currentUser ? (
                        <span onClick={()=>{}}>
                            <i className="far fa-heart" />
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    Please log in or sign up to like a post!
                                </Tooltip>
                            }
                        >
                            <i className="far fa-heart" />
                        </OverlayTrigger>
                    )}
                    {favourites_count}
                    <Link to={`/tutorials/${id}`}>
                        <i className="far fa-comments" />
                    </Link>
                    {tutorial_comments_count}
                </div>
            </Card.Body>
        </Card>
    );
};

export default Tutorial;
