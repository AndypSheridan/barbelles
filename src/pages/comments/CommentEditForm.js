import React, { useState } from "react";
import { Form } from "react-bootstrap";

const CommentEditForm = () => {
    const { id, content, setShowEditForm, setComments } = props;

    const [formContent, setFormContent] = useState(content);

    return (
        <Form onSubmit={()=>{}}>
            <Form.Group>
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
