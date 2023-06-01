import React, { useState } from "react";
import { Form } from "react-bootstrap";

const CommentEditForm = () => {
    const { id, content, setShowEditForm, setComments } = props;

    const [formContent, setFormContent] = useState(content);

    return (
        <Form>
            <Form.Group>
                <Form.Control />
            </Form.Group>
            <Form.Group>
                <Form.Control />
            </Form.Group>
            <div>
            <button>

            </button>
            <button>
                
            </button>
            </div>
        </Form>
    )
    
};

export default CommentEditForm;
