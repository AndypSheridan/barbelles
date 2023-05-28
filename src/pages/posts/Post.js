import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext"
import { Card, Media} from "react-bootstrap";
import {Link} from "react-router-dom"

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
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner

    return 
    <Card>
        <Card.Body>
            <Media>
                <Link to={`/profiles/${profile_id}`}>
                </Link>
            </Media>
        </Card.Body>
    </Card>
};

export default Post;
