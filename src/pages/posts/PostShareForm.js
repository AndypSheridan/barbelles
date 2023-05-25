import React, { useState } from "react";
import UploadIcon from "../../assets/uploadIcon.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../styles/PostShareEditForm.module.css";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";

const PostShareForm = () => {
    const [errors, setErrors] = useState();

    const textFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={title} />
            </Form.Group>
            <Button onClick={() => {}}>cancel</Button>
            <Button onClick={() => {}} type="submit">
                Share
            </Button>
        </div>
    );

    return (
        <Form className={styles.PostShareEditForm}>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={6} lg={6}>
                    <Container className="d-flex flex-column justify-content-center">
                        <Form.Group className="text-center">
                            <Form.Label
                                className="d-flex justify-content-center"
                                htmlFor="image-upload"
                            >
                                <Asset />
                            </Form.Label>
                        </Form.Group>
                    </Container>
                </Col>
                <Col md={6} lg={6} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>
                        {textFields}
                    </Container>
                </Col>
            </Row>
        </Form>
    );
};

export default PostShareForm;
