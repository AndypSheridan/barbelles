import React, { useState } from "react";
import styles from "../../styles/CommentShareEditForm.module.css";
import InputGroup from "react-bootstrap/InputGroup";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import btnStyles from "../../styles/Button.module.css";
import { useRedirect } from "../../hooks/useRedirect";

function TutorialCommentShareForm(props) {
    useRedirect("loggedOut");
    const {
        tutorial,
        setTutorial,
        setTutorialComments,
        profileImage,
        profile_id,
    } = props;
    const [content, setContent] = useState("");

    const handleChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axiosRes.post("/tutorial-comments/", {
                content,
                tutorial,
            });
            setTutorialComments((prevTutorialComments) => ({
                ...prevTutorialComments,
                results: [data, ...prevTutorialComments.results],
            }));
            setTutorial((prevTutorial) => ({
                results: [
                    {
                        ...prevTutorial.results[0],
                        tutorial_comments_count:
                            prevTutorial.results[0].tutorial_comments_count + 1,
                    },
                ],
            }));
            setContent("");
            toast.success("Comment posted!");
        } catch (err) {
            console.log(err);
            toast.error("Oops, please try again!");
        }
    };

    return (
        <Form className="mt-2" onSubmit={handleSubmit}>
            <Form.Group>
                <InputGroup>
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profileImage} />
                    </Link>
                    <Form.Control
                        className={styles.Form}
                        placeholder="my comment..."
                        as="textarea"
                        value={content}
                        onChange={handleChange}
                        rows={2}
                    />
                </InputGroup>
            </Form.Group>
            <button
                className={`${btnStyles.Button} ${btnStyles.Pink} btn d-block ml-auto`}
                disabled={!content.trim()}
                type="submit"
            >
                Post
            </button>
        </Form>
    );
}

export default TutorialCommentShareForm;
