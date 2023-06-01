import React, { useState } from "react";
import { ComponentDropDown } from "../../components/ComponentDropDown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/PostComment.module.css";
import { axiosRes } from "../../api/axiosDefaults";
import CommentEditForm from "./CommentEditForm";
import Avatar from "../../components/Avatar";
import Media from "react-bootstrap/Media";
import { Link } from "react-router-dom";

const PostComment = (props) => {
    const {
        profile_id,
        profile_image,
        owner,
        updated_at,
        content,
        id,
        setPost,
        setComments,
    } = props;

    const [showEditForm, setShowEditForm] = useState(false);

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/comments/${id}/`);
            setPost((prevPost) => ({
                results: [
                    {
                        ...prevPost.results[0],
                        comments_count: prevPost.results[0].comments_count - 1,
                    },
                ],
            }));

            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.filter(
                    (comment) => comment.id !== id
                ),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <hr />
            <Media>
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} />
                </Link>
                <Media.Body className="align-self-center ml-2">
                    <span className={styles.Owner}>{owner}</span>
                    <span className={styles.Date}>{updated_at}</span>
                    {showEditForm ? <CommentEditForm /> : <p>{content}</p>}
                </Media.Body>
                {is_owner && !showEditForm && (
                    <ComponentDropDown
                        handleEdit={() => setShowEditForm(true)}
                        handleDelete={handleDelete}
                    />
                )}
            </Media>
        </>
    );
};

export default PostComment;
