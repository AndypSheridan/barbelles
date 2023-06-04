import React, { useState } from "react";
import styles from "../../styles/TutorialComment.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import Media from "react-bootstrap/Media";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import TutorialCommentEditForm from "../tutorials/TutorialEditForm";
// import { TutorialCommentDropDown } from "../../components/ComponentDropDown";
import { ComponentDropDown } from "../../components/ComponentDropDown";

const TutorialComment = (props) => {
    const {
        profile_id,
        profile_image,
        owner,
        updated_at,
        content,
        id,
        setTutorial,
        setTutorialComments,
    } = props;

    const [showEditForm, setShowEditForm] = useState(false);
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/tutorial-comments/${id}/`);
            setTutorial((prevTutorial) => ({
                results: [
                    {
                        ...prevTutorial.results[0],
                        tutorial_comments_count:
                            prevTutorial.results[0].tutorial_comments_count - 1,
                    },
                ],
            }));

            setTutorialComments((prevTutorialComments) => ({
                ...prevTutorialComments,
                results: prevTutorialComments.results.filter(
                    (tutorialComment) => tutorialComment.id !== id
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
                    {showEditForm ? (
                        <TutorialCommentEditForm />
                    )}
                    <p>{content}</p>
                </Media.Body>

                {is_owner && (
                    <ComponentDropDown
                        handleEdit={() => {}}
                        handleDelete={handleDelete}
                    />
                )}
            </Media>
        </>
    );
};

export default TutorialComment;
