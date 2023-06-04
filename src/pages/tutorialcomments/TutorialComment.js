import React from "react";
import styles from "../../styles/TutorialComment.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

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
                        {showEditForm ? (
                            <CommentEditForm
                                id={id}
                                profile_id={profile_id}
                                content={content}
                                profile_image={profile_image}
                                setComments={setComments}
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
