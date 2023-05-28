import React from "react";

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

    return <div>Post component</div>;
};

export default Post;
