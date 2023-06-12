import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";

// import styles from "../../styles/CommentCreateEditForm.module.css";
import styles from "../../styles/CommentShareEditForm.module.css";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import btnStyles from "../../styles/Button.module.css"

function TutorialCommentEditForm(props) {
    const { id, content, setShowEditForm, setTutorialComments } = props;

    const [formContent, setFormContent] = useState(content);

    const handleChange = (event) => {
        setFormContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.put(`/tutorial-comments/${id}/`, {
                content: formContent.trim(),
            });
            setTutorialComments((prevTutorialComments) => ({
                ...prevTutorialComments,
                results: prevTutorialComments.results.map((tutorialComment) => {
                    return tutorialComment.id === id
                        ? {
                              ...tutorialComment,
                              content: formContent.trim(),
                              updated_at: "now",
                          }
                        : tutorialComment;
                }),
            }));
            setShowEditForm(false);
            toast.success("Comment updated")
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container>
        <Form onSubmit={handleSubmit} className="py-2">
            <Form.Group className="pr-1">
                <Form.Control
                    className={styles.Form}
                    as="textarea"
                    value={formContent}
                    onChange={handleChange}
                    rows={2}
                />
            </Form.Group>
            <div className="text-right">
                <button
                    className={`${btnStyles.Button} ${btnStyles.Dark}`}
                    onClick={() => setShowEditForm(false)}
                    type="button"
                >
                    Cancel
                </button>
                <button
                    className={`${btnStyles.Button} ${btnStyles.Pink}`}
                    disabled={!content.trim()}
                    type="submit"
                >
                    Update
                </button>
            </div>
        </Form>
        </Container>
    );
};

export default TutorialCommentEditForm;
