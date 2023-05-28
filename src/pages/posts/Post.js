import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext"

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

    return <div>Post component</div>;
};

export default Post;
