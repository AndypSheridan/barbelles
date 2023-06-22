import React from "react";
import { ComponentDropDown } from "../../components/ComponentDropDown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import styles from "../../styles/Tutorial.module.css";
import { Link, useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Tooltip from "react-bootstrap/Tooltip";
import Avatar from "../../components/Avatar";
import Media from "react-bootstrap/Media";
import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";

/**
* Display content for single tutorial.
* Adapted from code provided by CI 'Moments' walkthrough.
*/
const Tutorial = (props) => {
	const {
		id,
		owner,
		profile_id,
		profile_image,
		tutorial_comments_count,
		favourites_count,
		favourite_id,
		title,
		summary,
		video,
		updated_at,
		tutorialPage,
		setTutorials,
	} = props;

	const currentUser = useCurrentUser();
	const is_owner = currentUser?.username === owner;
	const history = useHistory();

	/**
    * Creates favourite instance and increments count by 1.
    */
	const handleFavourite = async () => {
		try {
			const { data } = await axiosRes.post("/favourites/", {
				tutorial: id,
			});
			setTutorials((prevTutorials) => ({
				...prevTutorials,
				results: prevTutorials.results.map((tutorial) => {
					return tutorial.id === id
						? {
								...tutorial,
								favourites_count: tutorial.favourites_count + 1,
								favourite_id: data.id,
						}
						: tutorial;
				}),
			}));
		} catch (err) {}
	};

	/**
    * Destroys favourite instance and decrements count by 1.
    */
	const handleUnfavourite = async () => {
		try {
			await axiosRes.delete(`/favourites/${favourite_id}/`);
			setTutorials((prevTutorials) => ({
				...prevTutorials,
				results: prevTutorials.results.map((tutorial) => {
					return tutorial.id === id
						? {
								...tutorial,
								favourites_count: tutorial.favourites_count - 1,
								favourite_id: null,
						}
						: tutorial;
				}),
			}));
		} catch (err) {}
	};

	/**
    * Routes user to edit page.
    */
	const handleEdit = () => {
		history.push(`/tutorials/${id}/edit`);
	};

	/**
    * Deletes tutorial instance from API.
    */
	const handleDelete = async () => {
		try {
			await axiosRes.delete(`/tutorials/${id}/`);
			history.push("/tutorials");
			toast.success("Tutorial deleted");
		} catch (err) {
			toast.error("Oops, please try again!");
		}
	};

	return (
		<Card className={`${styles.Tutorial} mb-3`}>
			<Card.Body>
				<Media className="align-items-center justify-content-between">
					<Link to={`/profiles/${profile_id}`}>
						<Avatar src={profile_image} height={60} />
						{owner}
					</Link>
					<div className="d-flex align-items-center">
						<span>
							{!tutorialPage && (
								<Link
									to={`/tutorials/${id}`}
									className={styles.TutorialSpan}
								>
									View
								</Link>
							)}{" "}
							{updated_at}
						</span>{" "}
						{is_owner && tutorialPage && (
							<ComponentDropDown
								handleEdit={handleEdit}
								handleDelete={handleDelete}
							/>
						)}
					</div>
				</Media>
			</Card.Body>
			<div className="embed-responsive embed-responsive-16by9">
				<iframe
					src={video}
					title="Tutorial"
					allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				></iframe>
			</div>
			<Card.Body className={styles.TextBrown}>
				{title && (
					<Card.Title className="text-center">{title}</Card.Title>
				)}
				{summary && <Card.Text>{summary}</Card.Text>}
				<div className={styles.TutorialInteraction}>
					{is_owner ? (
						<OverlayTrigger
							placement="top"
							overlay={
								<Tooltip>
									You can't save your own Tutorial!
								</Tooltip>
							}
						>
							<i
								className={`${styles.TextPink} fa-regular fa-bookmark`}
							/>
						</OverlayTrigger>
					) : favourite_id ? (
						<span onClick={handleUnfavourite}>
							<i
								className={`${styles.TextPink} fa-solid fa-bookmark`}
							/>
						</span>
					) : currentUser ? (
						<span onClick={handleFavourite}>
							<i
								className={`${styles.TextPink} fa-regular fa-bookmark`}
							/>
						</span>
					) : (
						<OverlayTrigger
							placement="top"
							overlay={
								<Tooltip>
									Please log in or sign up to save a tutorial!
								</Tooltip>
							}
						>
							<i className="fa-regular fa-bookmark" />
						</OverlayTrigger>
					)}
					{favourites_count}
					<Link to={`/tutorials/${id}`}>
						<i className="far fa-comments" />
					</Link>
					{tutorial_comments_count}
				</div>
			</Card.Body>
		</Card>
	);
};

export default Tutorial;
