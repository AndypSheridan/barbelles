import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import styles from "../../styles/TutorialShareEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function TutorialShareForm() {
    useRedirect("loggedOut");
    const [errors, setErrors] = useState();

    const [postData, setPostData] = useState({
        title: "",
        summary: "",
        video: "",
    });
    const { title, summary, video } = postData;

    const history = useHistory();

    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("summary", summary);
        formData.append("video", video);

        try {
            const { data } = await axiosReq.post("/tutorials/", formData);
            history.push(`/tutorials/${data.id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const textFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label>YouTube link</Form.Label>
                <Form.Control
                    value={video}
                    onChange={handleChange}
                    name="video"
                />
            </Form.Group>
            {errors?.content?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    value={title}
                    onChange={handleChange}
                    type="text"
                    name="title"
                />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Form.Group>
                <Form.Label>Instructions</Form.Label>
                <Form.Control
                    as="textarea"
                    value={summary}
                    onChange={handleChange}
                    rows={8}
                    name="summary"
                />
            </Form.Group>
            {errors?.content?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Button
                className={btnStyles.Black}
                onClick={() => history.goBack()}
            >
                Cancel
            </Button>
            <Button type="submit">Share</Button>
        </div>
    );

    return (
        <Container className={styles.TutorialShareEditBgImage}>
            <Form
                className={`${styles.TutorialShareEditForm} ${styles.TutorialShareEditFormBg}`}
                onSubmit={handleSubmit}
            >
                <h1 className="text-center py-2">Upload tutorial</h1>
                <Row>
                    {/* <Col className={`py-2 p-0 p-md-2`} md={6} lg={6}>
                        <Container
                            className={`${appStyles.Content} ${styles.PostShareContainer} ${styles.PostShareEditFormBg} d-flex flex-column justify-content-center`}
                        >
                            <Form.Group
                                className={`${styles.PostShareBgTransparent} text-center`}
                            >
                                {image ? (
                                    <>
                                        <figure>
                                            <Image
                                                className={appStyles.Image}
                                                src={image}
                                                rounded
                                            />
                                        </figure>
                                        <div
                                            className={
                                                styles.PostShareBgTransparent
                                            }
                                        >
                                            <Form.Label
                                                className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                                                htmlFor="image-upload"
                                            >
                                                Change image
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
                                )}
                                <Form.File
                                    ref={imageInput}
                                    onChange={handleChangeImage}
                                    id="image-upload"
                                    accept="image/*"
                                />
                            </Form.Group>
                            {errors?.image?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))} */}

                            {/* <div className="d-md-none">{textFields}</div>
                        </Container>
                    </Col> */}
                    <Col md={6} lg={6} className="d-none d-md-block p-2 p-md-2">
                        <Container
                            className={`${appStyles.Content} ${styles.PostShareContainer}`}
                        >
                            {textFields}
                        </Container>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default TutorialShareForm;
