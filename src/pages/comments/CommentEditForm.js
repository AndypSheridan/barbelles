import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/CommentShareEditForm.module.css";
import { toast } from "react-toastify";

const CommentEditForm = (props) => {
    const { id, content, setShowEditForm, setComments } = props;

    const [formContent, setFormContent] = useState(content);

    const handleChange = (event) => {
        setFormContent(event.target.value);
    };

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
            toast.success("Comment updated")
        } catch (err) {}
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="pr-1">
                <Form.Control
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
                    className={styles.Button}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={!content.trim()}
                    className={styles.Button}
                >
                    Update
                </button>
            </div>
        </Form>
    );
};

export default CommentEditForm;
