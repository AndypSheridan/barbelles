import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { axiosReq } from "../../api/axiosDefaults";
import {
    useCurrentUser,
    useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import styles from "../../styles/UserProfileEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { toast } from "react-toastify";

const UserProfileEditForm = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const { id } = useParams();
    const history = useHistory();
    const imageFile = useRef();

    const [profileData, setProfileData] = useState({
        name: "",
        bio: "",
        image: "",
    });
    const { name, bio, image } = profileData;

    const [errors, setErrors] = useState({});

    // useEffect(() => {

    //     const handleMount = async () => {
    //         if (currentUser?.profile_id?.toString() === id) {
    //             try {
    //                 const { data } = await axiosReq.get(`/profiles/${id}/`);
    //                 const { name, bio, image } = data;
    //                 setProfileData({ name, bio, image });
    //             } catch (err) {
    //                 console.log(err);
    //                 history.push("/");
    //             }
    //         } else {
    //             history.push("/");
    //         }
    //     };

    //     handleMount();
    // }, [currentUser, history, id]);

    useEffect(() => {
        let isMounted = true; // Flag to track component mount status

        const handleMount = async () => {
            if (currentUser?.profile_id?.toString() === id) {
                try {
                    const { data } = await axiosReq.get(`/profiles/${id}/`);
                    const { name, bio, image } = data;
                    if (isMounted) {
                        setProfileData({ name, bio, image });
                    }
                } catch (err) {
                    console.log(err);
                    if (isMounted) {
                        history.push("/");
                    }
                }
            } else {
                if (isMounted) {
                    history.push("/");
                }
            }
        };

        handleMount();

        return () => {
            isMounted = false; // Set the flag to false when the component unmounts
        };
    }, [currentUser, history, id]);

    const handleChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("bio", bio);

        if (imageFile?.current?.files[0]) {
            formData.append("image", imageFile?.current?.files[0]);
        }

        try {
            const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
            setCurrentUser((currentUser) => ({
                ...currentUser,
                profile_image: data.image,
            }));
            history.goBack();
            toast.success("Profile updated");
        } catch (err) {
            console.log(err);
            toast.error("Oops, please try again!");
            setErrors(err.response?.data);
        }
    };

    const textFields = (
        <>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    value={name}
                    onChange={handleChange}
                    name="name"
                />
            </Form.Group>
            {errors?.name?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Form.Group>
                <Form.Label>Bio</Form.Label>
                <Form.Control
                    as="textarea"
                    value={bio}
                    onChange={handleChange}
                    name="bio"
                    rows={7}
                />
            </Form.Group>
            {errors?.bio?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Button
                className={`${btnStyles.Button} ${btnStyles.Green} ${styles.ButtonSlide}`}
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
        </>
    );

    return (
        <Container
            className={`${styles.ProfileEditBgImage} ${styles.Container}`}
        >
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
                        <Container className={appStyles.Content}>
                            <h1>Edit profile</h1>
                            <Form.Group>
                                {image && (
                                    <figure>
                                        <Image src={image} fluid />
                                    </figure>
                                )}
                                {errors?.image?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                                <div>
                                    <Form.Label
                                        className={`${btnStyles.Button} ${btnStyles.Green} btn my-auto`}
                                        htmlFor="image-upload"
                                    >
                                        Change image
                                    </Form.Label>
                                </div>
                                <Form.File
                                    id="image-upload"
                                    ref={imageFile}
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files.length) {
                                            setProfileData({
                                                ...profileData,
                                                image: URL.createObjectURL(
                                                    e.target.files[0]
                                                ),
                                            });
                                        }
                                    }}
                                />
                            </Form.Group>
                            <div className="d-md-none">{textFields}</div>
                        </Container>
                    </Col>
                    <Col
                        md={5}
                        lg={6}
                        className="d-none d-md-block p-0 p-md-2 text-center"
                    >
                        <Container className={appStyles.Content}>
                            {textFields}
                        </Container>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default UserProfileEditForm;
