import React, { useState } from "react";
import UploadIcon from "../../assets/uploadIcon.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../styles/PostShareEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css"
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";

const PostShareForm = () => {
    const [errors, setErrors] = useState();

    const [postData, setPostData] = useState({
        title: "",
        content: "",
        image: "",
    });
    const { title, content, image } = postData;

    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const textFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    value={title}
                    onChange={handleChange}
                    type="text"
                    name="title"
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Tell us about your journey</Form.Label>
                <Form.Control
                    as="textarea"
                    value={content}
                    onChange={handleChange}
                    rows={8}
                    name="content"
                />
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
                            { image ? ( 
                                <>
                                <figure>
                                    <Image className={appStyles.Image} src={image} rounded />
                                </figure>
                                <div>
                                    <Form.Label className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                                    htmlFor="image-upload">Change image

                                    </Form.Label>
                                </div>
                                </>
                            ) : (
                            <Form.Label
                                className="d-flex justify-content-center"
                                htmlFor="image-upload"
                            >
                                <Asset
                                    src={UploadIcon}
                                    message={"Upload your image here!"}
                                />
                            </Form.Label>
                            ) }
                            <Form.File
                                id="image-upload"
                                accept="image/*"
                                onChange={handleChangeImage}
                            />
                        </Form.Group>
                        <div className="d-md-none">{textFields}</div>
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
