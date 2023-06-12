import React, { useState, useEffect } from "react";
import styles from "../../styles/TutorialShareEditForm.module.css";
import { useHistory, useParams } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";

const TutorialEditForm = () => {
    const [errors, setErrors] = useState();

    const [tutorialData, setTutorialData] = useState({
        title: "",
        summary: "",
        video: "",
    });
    const { title, summary, video } = tutorialData;

    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/tutorials/${id}/`);
                const { title, summary, video, is_owner } = data;

                is_owner
                    ? setTutorialData({ title, summary, video })
                    : history.push("/");
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [id, history]);

    const handleChange = (event) => {
        setTutorialData({
            ...tutorialData,
            [event.target.name]: event.target.value,
        });
    };

    // const handleChangeImage = (event) => {
    //     if (event.target.files.length) {
    //         URL.revokeObjectURL(image);
    //         setPostData({
    //             ...postData,
    //             image: URL.createObjectURL(event.target.files[0]),
    //         });
    //     }
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("summary", summary);
        formData.append("video", video);

        // if (imageInput?.current?.files[0]) {
        //     formData.append("image", imageInput.current.files[0]);
        // }

        try {
            await axiosReq.put(`/tutorials/${id}/`, formData);
            history.push(`/tutorials/${id}`);
            toast.success("Tutorial updated");
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
                <Form.Label>Video link</Form.Label>
                <Form.Control
                    value={video}
                    onChange={handleChange}
                    type="text"
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
                <Form.Label>Summary</Form.Label>
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
                className={`${btnStyles.Button} ${btnStyles.Dark}`}
                onClick={() => history.goBack()}
            >
                Cancel
            </Button>
            <Button
                className={`${btnStyles.Button} ${btnStyles.Pink}`}
                type="submit"
            >
                Save
            </Button>
        </div>
    );

    return (
        <Container
            className={`${styles.TutorialShareEditBgImage} ${styles.TutorialShareContainer}`}
        >
            <Form
                className={`${styles.TutorialShareEditForm} ${styles.TutorialShareEditFormBg}`}
                onSubmit={handleSubmit}
            >
                <h1 className="text-center py-2">Edit tutorial</h1>
                <Row>
                    {/* <Col className={`py-2 p-0 p-md-2`} md={6} lg={6}>
                        <Container
                            className={`${appStyles.Content} ${styles.TutorialShareContainer}
                            ${styles.TutorialShareEditFormBg} d-flex flex-column justify-content-center`}
                        >
                            <Form.Group
                                className={`${styles.TutorialShareBgTransparent} text-center`}
                            >
                                <figure>
                                    <Image
                                        className={appStyles.Image}
                                        src={image}
                                        rounded
                                    />
                                </figure>
                                <div className={styles.PostShareBgTransparent}>
                                    <Form.Label
                                        className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                                        htmlFor="image-upload"
                                    >
                                        Change image
                                    </Form.Label>
                                </div>

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
                            ))}

                            <div className="d-md-none">{textFields}</div>
                        </Container>
                    </Col> */}
                    <Col
                        md={6}
                        lg={6}
                        className="d-none mx-auto d-md-block p-2 p-md-2"
                    >
                        <Container
                            className={`${appStyles.Content} ${styles.TutorialShareContainer}`}
                        >
                            {textFields}
                        </Container>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default TutorialEditForm;
