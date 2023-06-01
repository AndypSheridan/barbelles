import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/CommentShareEditForm.module.css"

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

        } catch (err) {}
    };

    return (
        <Form onSubmit={() => {}}>
            <Form.Group className="pr-1">
                <Form.Control />
            </Form.Group>
            <Form.Group>
                <Form.Control />
            </Form.Group>
            <div>
                <button>Cancel</button>
                <button>Update</button>
            </div>
        </Form>
    );
};

export default CommentEditForm;
