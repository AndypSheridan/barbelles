import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

const Post = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        title,
        story,
        image,
        updated_at,
        postPage,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    return (
    <Card>
        <Card.Body>
            <Media className="align-items-center justify-content-between">
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} height={60} />
                    {owner}
                </Link>
                <div className="d-flex align-items-center justify-content-between">
                    <span>{updated_at}</span>
                    {is_owner && postPage && "..."}
                </div>
            </Media>
        </Card.Body>
        <Link>
        <Card.Img src={image} alt={title} />
        </Link>
    </Card>
    );
};

export default Post;
