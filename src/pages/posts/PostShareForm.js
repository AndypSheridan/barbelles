import React, { useState, useRef } from "react";
import styles from "../../styles/PostShareEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useRedirect } from "../../hooks/useRedirect";
import UploadIcon from "../../assets/uploadIcon.png";
import { axiosReq } from "../../api/axiosDefaults";
import Container from "react-bootstrap/Container";
import { useHistory } from "react-router-dom";
import appStyles from "../../App.module.css";
import Button from "react-bootstrap/Button";
import Asset from "../../components/Asset";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/**
* Render form to share a post.
*/
function PostShareForm() {
	useRedirect("loggedOut");
	const [errors, setErrors] = useState();

	const [postData, setPostData] = useState({
		title: "",
		story: "",
		image: "",
	});
	const { title, story, image } = postData;

	const imageInput = useRef(null);
	const history = useHistory();

	const handleChange = (event) => {
		setPostData({
			...postData,
			[event.target.name]: event.target.value,
		});
	};

	/**
    * Adjust the image.
    */
	const handleChangeImage = (event) => {
		if (event.target.files.length) {
			URL.revokeObjectURL(image);
			setPostData({
				...postData,
				image: URL.createObjectURL(event.target.files[0]),
			});
		}
	};

	/**
    * Send post data to API.
    */
	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData();

		formData.append("title", title);
		formData.append("story", story);
		formData.append("image", imageInput.current.files[0]);

		try {
			const { data } = await axiosReq.post("/posts/", formData);
			history.push(`/posts/${data.id}`);
			toast.success("Posted!");
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
				<Form.Label>Title</Form.Label>
				<Form.Control
					value={title}
					onChange={handleChange}
					type="text"
					name="title"
					aria-label="post title"
				/>
			</Form.Group>
			{errors?.title?.map((message, idx) => (
				<Alert variant="warning" key={idx}>
					{message}
				</Alert>
			))}

			<Form.Group>
				<Form.Label>Content</Form.Label>
				<Form.Control
					as="textarea"
					value={story}
					onChange={handleChange}
					rows={8}
					name="story"
					aria-label="post story"
				/>
			</Form.Group>
			{errors?.content?.map((message, idx) => (
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
		<Container className={styles.PostShareEditBgImage}>
			<Form
				className={`${styles.PostShareEditForm} ${styles.PostShareEditFormBg}`}
				onSubmit={handleSubmit}
			>
				<Row>
					<Col className={`py-2 p-0 p-md-2`} md={6} lg={6}>
						<Container
							className={`${appStyles.Content} ${styles.PostShareContainer} ${styles.PostShareEditFormBg} d-flex flex-column justify-content-center`}
						>
							<h1 className="text-center py-2">
								Share your journey!
							</h1>
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
							))}

							<div className="d-md-none">{textFields}</div>
						</Container>
					</Col>
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

export default PostShareForm;
