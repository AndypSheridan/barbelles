import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { axiosRes } from "../../api/axiosDefaults";

const CommentEditForm = () => {
    const { id, content, setShowEditForm, setComments } = props;

    const [formContent, setFormContent] = useState(content);

    const handleChange = (event) => {
        setFormContent(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes
        } catch(err) {}
    }

    return (
        <Form onSubmit={()=>{}}>
            <Form.Group className="pr-1">
                <Form.Control />
            </Form.Group>
            <Form.Group>
                <Form.Control />
            </Form.Group>
            <div>
            <button>
                Cancel
            </button>
            <button>
                Update
            </button>
            </div>
        </Form>
    )
    
};

export default CommentEditForm;
