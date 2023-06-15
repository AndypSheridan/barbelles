import React, { useEffect, useState } from "react";
import { ProfileDropDown } from "../../components/ComponentDropDown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import NoSearchResults from "../../assets/nosearchresults.png";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "../../styles/ProfilePage.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Container from "react-bootstrap/Container";
import { fetchMoreData } from "../../utils/utils";
import { Button, Image } from "react-bootstrap";
import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import {
    useProfileData,
    useSetProfileData,
} from "../../contexts/ProfileDataContext";
import Asset from "../../components/Asset";
import TopProfiles from "./TopProfiles";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Post from "../posts/Post";
import btnStyles from "../../styles/Button.module.css"
import { useRedirect } from "../../hooks/useRedirect";

const ProfilePage = () => {
    useRedirect("loggedOut");
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();
    const { id } = useParams();
    const { setProfileData, handleFollow, handleUnfollow } =
        useSetProfileData();
    const { pageProfile } = useProfileData();
    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;

    const [profilePosts, setProfilePosts] = useState({ results: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: pageProfile }, { data: profilePosts }] =
                    await Promise.all([
                        axiosReq.get(`/profiles/${id}/`),
                        axiosReq.get(`/posts/?owner__profile=${id}`),
                    ]);
                console.log(pageProfile);
                setProfileData((prevState) => ({
                    ...prevState,
                    pageProfile: { results: [pageProfile] },
                }));
                setProfilePosts(profilePosts);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [id, setProfileData]);

    const mainProfile = (
        <>
            {profile?.is_owner && <ProfileDropDown id={profile?.id} />}
            <Row noGutters className="px-3 text-center">
                <Col className="text-lg-left" lg={3}>
                    <Image
                        className={styles.ProfileImage}
                        roundedCircle
                        src={profile?.image}
                    />
                </Col>
                <Col lg={6}>
                    <h4 className={styles.ProfileOwner}>{profile?.owner}</h4>
                    <Row className="justify-content-center no-gutters">
                        <Col xs={3} className="my-2">
                            <div className={styles.TextPink}>{profile?.posts_count}</div>
                            <div className={styles.TextBrown}>Posts</div>
                        </Col>
                        <Col xs={3} className="my-2 mx-1">
                            <div className={styles.TextPink}>{profile?.followers_count}</div>
                            <div className={styles.TextBrown}>Followers</div>
                        </Col>
                        <Col xs={3} className="my-2">
                            <div className={styles.TextPink}>{profile?.following_count}</div>
                            <div className={styles.TextBrown}>Following</div>
                        </Col>
                    </Row>
                </Col>
                <Col className="text-lg-right" lg={3}>
                    {currentUser &&
                        !is_owner &&
                        (profile?.following_id ? (
                            <Button className={btnStyles.Follow} onClick={() => handleUnfollow(profile)} aria-label="unfollow">
                                <i
                                className={`${styles.UnfollowIcon} fa-solid fa-user-xmark`}
                            ></i>
                            </Button>
                        ) : (
                            <Button className={btnStyles.Follow} onClick={() => handleFollow(profile)} aria-label="follow">
                                <i
                                    className={`${styles.FollowIcon} fa-solid fa-user-plus`}
                                ></i>
                            </Button>
                        ))}
                </Col>
                <Col className="p-3">
                    {profile?.bio && <Col className={`${styles.TextBrown} p-3`}>{profile.bio}</Col>}
                </Col>
            </Row>
        </>
    );

    const mainProfilePosts = (
        <>
            <hr />
            <p className={`${styles.TextPink} text-center`}>{profile?.owner}'s posts</p>
            <hr />
            {profilePosts.results.length ? (
                <InfiniteScroll
                    children={profilePosts.results.map((post) => (
                        <Post
                            key={post.id}
                            {...post}
                            setPosts={setProfilePosts}
                        />
                    ))}
                    dataLength={profilePosts.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!profilePosts.next}
                    next={() => fetchMoreData(profilePosts, setProfilePosts)}
                />
            ) : (
                <Asset
                    src={NoSearchResults}
                    message={`No results found, ${profile?.owner} hasn't posted yet.`}
                />
            )}
        </>
    );

    return (
        <Container>
            <Row className={styles.Row}>
                <Col className="py-2 p-0 p-lg-2" lg={8}>
                    <TopProfiles mobile />
                    <Container className={appStyles.Content}>
                        {hasLoaded ? (
                            <>
                                {mainProfile}
                                {mainProfilePosts}
                            </>
                        ) : (
                            <Asset spinner />
                        )}
                    </Container>
                </Col>
                <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                    <TopProfiles />
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;
