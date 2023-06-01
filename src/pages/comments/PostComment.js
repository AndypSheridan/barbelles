import React from "react";
import styles from "../../styles/PostComment.module.css";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

const PostComment = (props) => {
    return 
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
        </Media>
    </div>
};

export default PostComment;
