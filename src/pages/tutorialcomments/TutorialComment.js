import React, { useState } from "react";
import { ComponentDropDown } from "../../components/ComponentDropDown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import TutorialCommentEditForm from "./TutorialCommentEditForm";
import styles from "../../styles/TutorialComment.module.css";
import { useRedirect } from "../../hooks/useRedirect";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import Media from "react-bootstrap/Media";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const TutorialComment = (props) => {
    useRedirect("loggedOut");
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
            toast.success("Comment deleted");
        } catch (err) {
            toast.error("Oops, please try again!");
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
                        <TutorialCommentEditForm
                            id={id}
                            profile_id={profile_id}
                            content={content}
                            profileImage={profile_image}
                            setTutorialComments={setTutorialComments}
                            setShowEditForm={setShowEditForm}
                        />
                    ) : (
                        <p>{content}</p>
                    )}
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

export default TutorialComment;
