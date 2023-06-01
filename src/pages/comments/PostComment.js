import React from "react";
import styles from "../../styles/PostComment.module.css";
import Avatar from "../../components/Avatar";
import Media from "react-bootstrap/Media";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { ComponentDropDown } from "../../components/ComponentDropDown";

const PostComment = (props) => {
    const { profile_id, profile_image, owner, updated_at, content } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    return (
        <div>
            <hr />
            <Media>
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} />
                </Link>
                <Media.Body className="align-self-center ml-2">
                    <span className={styles.Owner}>{owner}</span>
                    <span className={styles.Date}>{updated_at}</span>
                    <p>{content}</p>
                </Media.Body>
                (is_owner && (
                    <ComponentDropDown handleCommentEdit={() => {}} handleCommentDelete={() => {}} />
                ))
            </Media>
        </div>
    );
};

export default PostComment;
