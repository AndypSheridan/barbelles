import React, { useState } from "react";
import UploadIcon from "../../assets/uploadIcon.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../styles/PostShareEditForm.module.css";
import appStyles from "../../App.module.css";

const PostShareForm = () => {
    const [errors, setErrors] = useState();

    const textFields = (
        <div>
            <Button onClick={() => {}}></Button>
        </div>
    );

    return <div>PostShareForm</div>;
};

export default PostShareForm;
