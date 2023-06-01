import React, { useState } from "react";

const CommentEditForm = () => {
    const { id, content, setShowEditForm, setComments } = props;

    const [formContent, setFormContent] = useState(content);

    return <div>CommentEditForm</div>;
};

export default CommentEditForm;
