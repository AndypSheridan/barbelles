import React, { useState } from "react";
import styles from "../../styles/TutorialShareEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useRedirect } from "../../hooks/useRedirect";
import { axiosReq } from "../../api/axiosDefaults";
import Container from "react-bootstrap/Container";
import { useHistory } from "react-router-dom";
import appStyles from "../../App.module.css";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
            toast.error("Oops, please try again!");
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const textFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label>YouTube link</Form.Label>
                <p className={styles.DarkPink}>
                    Example: https://www.youtube.com/watch?v=***********
                </p>
                <Form.Control
                    value={video}
                    onChange={handleChange}
                    name="video"
                />
            </Form.Group>
            {errors?.video?.map((message, idx) => (
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
            {errors?.summary?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Button
                className={`${btnStyles.Button} ${btnStyles.Green}`}
                onClick={() => history.goBack()}
            >
                Cancel
            </Button>
            <Button
                className={`${btnStyles.Button} ${btnStyles.Pink}`}
                type="submit"
            >
                Share
            </Button>
        </div>
    );

    return (
        <Container className={styles.TutorialShareEditBgImage}>
            <Form
                className={`${styles.TutorialShareEditForm} ${styles.TutorialShareEditFormBg}`}
                onSubmit={handleSubmit}
            >
                <Row className="text-center">
                    <Col
                        md={6}
                        lg={6}
                        className="d-md-block p-2 mx-auto p-md-2"
                    >
                        <Container
                            className={`${appStyles.Content} ${styles.PostShareContainer} ${styles.TextBrown}`}
                        >
                            <h1 className="text-center py-2">
                                Upload tutorial
                            </h1>
                            {textFields}
                        </Container>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default TutorialShareForm;
