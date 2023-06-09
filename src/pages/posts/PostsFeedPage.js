import React, { useEffect, useState } from "react";
import NoSearchResults from "../../assets/nosearchresults.png";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "../../styles/PostsFeedPage.module.css";
import SocialLinks from "../../components/SocialLinks";
import { useRedirect } from "../../hooks/useRedirect"
import { axiosReq } from "../../api/axiosDefaults";
import { fetchMoreData } from "../../utils/utils";
import TopProfiles from "../profiles/TopProfiles";
import Container from "react-bootstrap/Container";
import { useLocation } from "react-router-dom";
import Asset from "../../components/Asset";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Post from "./Post";

/**
* Displays list of all posts.
* Adapted from function-code provided by CI 'Moments' walkthrough.
*/
const PostsFeedPage = ({ message, filter = "" }) => {
	useRedirect("loggedOut")
	const [posts, setPosts] = useState({ results: [] });
	const [hasLoaded, setHasLoaded] = useState(false);
	const { pathname } = useLocation();

	const [query, setQuery] = useState("");

	/**
    * Fetch first ten posts from API.
	* Return filter results.
    */
	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const { data } = await axiosReq.get(
					`/posts/?${filter}search=${query}`
				);
				setPosts(data);
				setHasLoaded(true);
			} catch (err) {}
		};

		setHasLoaded(false);

		const searchTimer = setTimeout(() => {
			fetchPosts();
		}, 1200);

		return () => {
			clearTimeout(searchTimer);
		};
	}, [filter, query, pathname]);

	return (
		<Container className={`${styles.homeBackground}`}>
			<Row className="justify-content-center mt-16">
				<Col className={styles.Col} lg={7}>
					<TopProfiles mobile />

					<i className={`fas fa-search ${styles.SearchIcon}`} />
					<Form
						className={styles.SearchBar}
						onSubmit={(event) => event.preventDefault()}
					>
						<Form.Control
							value={query}
							onChange={(event) => setQuery(event.target.value)}
							type="text"
							className="mr-sm-2"
							placeholder="Search posts"
						/>
					</Form>

					{hasLoaded ? (
						<>
							{posts.results.length ? (
								<InfiniteScroll
									children={posts.results.map((post) => (
										<Post
											key={post.id}
											{...post}
											setPosts={setPosts}
										/>
									))}
									dataLength={posts.results.length}
									loader={<Asset spinner />}
									hasMore={!!posts.next}
									next={() => {
										fetchMoreData(posts, setPosts);
									}}
								/>
							) : (
								<Container>
									<Asset
										src={NoSearchResults}
										message={message}
									/>
								</Container>
							)}
						</>
					) : (
						<Container>
							<Asset spinner />
						</Container>
					)}
				</Col>
				<Col
					className={`${styles.ProfileCol} d-lg-block d-none`}
					lg={5}
				>
					<Container className={styles.Social}>
						<SocialLinks />
					</Container>
					<TopProfiles />
				</Col>
			</Row>
		</Container>
	);
};

export default PostsFeedPage;
