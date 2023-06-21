import React, { useState } from "react";
import styles from "../../styles/CommentShareEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useRedirect } from "../../hooks/useRedirect";
import { axiosRes } from "../../api/axiosDefaults";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

const CommentEditForm = (props) => {
    useRedirect("loggedOut");
    const { id, content, setShowEditForm, setComments } = props;

    const [formContent, setFormContent] = useState(content);

    const handleChange = (event) => {
        setFormContent(event.target.value);
    };

    /**
    * Updates API comment data.
    */
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.put(`/comments/${id}/`, {
                content: formContent.trim(),
            });
            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.map((comment) => {
                    return comment.id === id
                        ? {
                              ...comment,
                              content: formContent.trim(),
                              updated_at: "now",
                          }
                        : comment;
                }),
            }));

            setShowEditForm(false);
            toast.success("Comment updated");
        } catch (err) {}
    };

    return (
        <Form onSubmit={handleSubmit} className="py-2">
            <Form.Group className="pr-1">
                <Form.Control
                    className={styles.Form}
                    onChange={handleChange}
                    value={formContent}
                    as="textarea"
                    rows={2}
                />
            </Form.Group>
            <div className="text-right">
                <button
                    type="button"
                    onClick={() => setShowEditForm(false)}
                    className={`${btnStyles.Button} ${btnStyles.Dark}`}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={!content.trim()}
                    className={`${btnStyles.Button} ${btnStyles.Pink}`}
                >
                    Update
                </button>
            </div>
        </Form>
    );
};

export default CommentEditForm;
