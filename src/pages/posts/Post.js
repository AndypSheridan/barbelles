import React from "react";
import { ComponentDropDown } from "../../components/ComponentDropDown";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link, useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/Post.module.css";
import Tooltip from "react-bootstrap/Tooltip";
import Avatar from "../../components/Avatar";
import Media from "react-bootstrap/Media";
import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";

/**
 * Displays post content.
 * Adapted from function-code provided in CI 'Moments' walkthrough.
 */
const Post = (props) => {
	const {
		id,
		owner,
		profile_id,
		profile_image,
		comments_count,
		likes_count,
		like_id,
		title,
		story,
		image,
		updated_at,
		postPage,
		setPosts,
	} = props;

	const currentUser = useCurrentUser();
	const is_owner = currentUser?.username === owner;
	const history = useHistory();

	/**
    * Delete post instance from API.
    */
	const handleDelete = async () => {
		try {
			await axiosRes.delete(`/posts/${id}/`);
			history.push("/posts-feed");
			toast.success("Post deleted");
		} catch (err) {
			toast.error("Oops, please try again!");
		}
	};

	/**
    * Route user to post-edit page.
    */
	const handleEdit = () => {
		history.push(`/posts/${id}/edit`);
	};

	/**
    * Retrieve likes count from API and increment by 1.
    */
	const handleLike = async () => {
		try {
			const { data } = await axiosRes.post("/likes/", { post: id });
			setPosts((prevPosts) => ({
				...prevPosts,
				results: prevPosts.results.map((post) => {
					return post.id === id
						? {
								...post,
								likes_count: post.likes_count + 1,
								like_id: data.id,
						}
						: post;
				}),
			}));
		} catch (err) {}
	};

	/**
    * Retrieve likes count from API and decrement by 1.
    */
	const handleUnlike = async () => {
		try {
			await axiosRes.delete(`/likes/${like_id}`);
			setPosts((prevPosts) => ({
				...prevPosts,
				results: prevPosts.results.map((post) => {
					return post.id === id
						? {
								...post,
								likes_count: post.likes_count - 1,
								like_id: null,
						}
						: post;
				}),
			}));
		} catch (err) {}
	};

	return (
		<Card className={`${styles.Card} mb-3`}>
			<Card.Body>
				<Media className="align-items-center justify-content-between">
					<Link
						to={`/profiles/${profile_id}`}
						aria-label="view profile"
					>
						<Avatar src={profile_image} height={60} />
						<span className={styles.PostOwner}>{owner}</span>
					</Link>
					<div className="d-flex align-items-center justify-content-between">
						<span className={styles.PostDate}>{updated_at}</span>
						{is_owner && postPage && (
							<ComponentDropDown
								handleEdit={handleEdit}
								handleDelete={handleDelete}
							/>
						)}
					</div>
				</Media>
			</Card.Body>
			<Link to={`/posts/${id}`} aria-label="view post">
				<Card.Img className={styles.Image} src={image} alt={title} />
			</Link>
			<Card.Body>
				{title && (
					<Card.Title className="text-center">{title}</Card.Title>
				)}
				{story && <Card.Text>{story}</Card.Text>}
				<div className={styles.PostInteraction}>
					{is_owner ? (
						<OverlayTrigger
							placement="top"
							overlay={
								<Tooltip>You can't like your own post!</Tooltip>
							}
						>
							<i
								className={`${styles.HeartOutline} far fa-heart`}
							/>
						</OverlayTrigger>
					) : like_id ? (
						<span onClick={handleUnlike} className="mx-1">
							<i className={`${styles.Heart} fas fa-heart`} />
						</span>
					) : currentUser ? (
						<span onClick={handleLike} className="mx-1">
							<i
								className={`${styles.HeartOutline} far fa-heart`}
							/>
						</span>
					) : (
						<OverlayTrigger
							placement="top"
							overlay={
								<Tooltip>
									Please log in or sign up to like a post!
								</Tooltip>
							}
						>
							<i className="far fa-heart" />
						</OverlayTrigger>
					)}
					{likes_count}
					<Link
						to={`/posts/${id}`}
						className="mx-1"
						aria-label="view comments"
					>
						<i className="far fa-comments" />
					</Link>
					{comments_count}
				</div>
			</Card.Body>
		</Card>
	);
};

export default Post;
