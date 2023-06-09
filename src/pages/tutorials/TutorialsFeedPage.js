import React, { useEffect, useState } from "react";
import NoSearchResults from "../../assets/nosearchresults.png";
import styles from "../../styles/TutorialsFeedPage.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import SocialLinks from "../../components/SocialLinks";
import { useRedirect } from "../../hooks/useRedirect";
import { axiosReq } from "../../api/axiosDefaults";
import Container from "react-bootstrap/Container";
import { fetchMoreData } from "../../utils/utils";
import TopProfiles from "../profiles/TopProfiles";
import { useLocation } from "react-router-dom";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tutorial from "./Tutorial";

const TutorialsFeedPage = ({ message, filter = "" }) => {
	useRedirect("loggedOut");
	const [tutorials, setTutorials] = useState({ results: [] });
	const [hasLoaded, setHasLoaded] = useState(false);
	const { pathname } = useLocation();

	const [query, setQuery] = useState("");

	useEffect(() => {
		const fetchTutorials = async () => {
			try {
				const { data } = await axiosReq.get(
					`/tutorials/?${filter}search=${query}`
				);
				setTutorials(data);
				setHasLoaded(true);
			} catch (err) {}
		};
		setHasLoaded(false);

		const searchTimer = setTimeout(() => {
			fetchTutorials();
		}, 1200);
		return () => {
			clearTimeout(searchTimer);
		};
	}, [filter, query, pathname]);

	return (
		<Container className={`${styles.Container} h-100`}>
			<Row>
				<Col lg={7} className="pr-4">
					<TopProfiles mobile />
					<i className={`fas fa-search ${styles.SearchIcon}`} />
					<Form
						className={styles.SearchBar}
						onSubmit={(event) => event.preventDefault()}
					>
						<Form.Control
							type="text"
							className="mr-sm-2"
							placeholder="Search tutorials"
							value={query}
							onChange={(event) => setQuery(event.target.value)}
						/>
					</Form>
					{hasLoaded ? (
						<>
							{tutorials.results.length ? (
								<InfiniteScroll
									children={tutorials.results.map(
										(tutorial) => (
											<Tutorial
												key={tutorial.id}
												{...tutorial}
												setTutorials={setTutorials}
											/>
										)
									)}
									dataLength={tutorials.results.length}
									loader={<Asset spinner />}
									hasMore={!!tutorials.next}
									next={() =>
										fetchMoreData(tutorials, setTutorials)
									}
								/>
							) : (
								<Container className={appStyles.Content}>
									<Asset
										src={NoSearchResults}
										message={message}
									/>
								</Container>
							)}
						</>
					) : (
						<Container className={appStyles.Content}>
							<Asset spinner />
						</Container>
					)}
				</Col>
				<Col lg={5} className="d-lg-block d-none">
					<Container className={styles.Social}>
						<SocialLinks />
					</Container>
					<TopProfiles />
				</Col>
			</Row>
		</Container>
	);
};

export default TutorialsFeedPage;
