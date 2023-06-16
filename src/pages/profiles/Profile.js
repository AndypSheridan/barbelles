import React from "react";
import { useSetProfileData } from "../../contexts/ProfileDataContext";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/Profile.module.css";
import Avatar from "../../components/Avatar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Profile = (props) => {
    const { profile, mobile, imageSize = 60 } = props;
    const { id, following_id, image, owner } = profile;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const { handleFollow, handleUnfollow } = useSetProfileData();

    return (
        <div
            className={`my-3 d-flex align-items-center ${
                mobile && "flex-column"
            }`}
        >
            <div>
                <Link to={`/profiles/${id}`} className="align-self-center" aria-label="avatar image">
                    <Avatar src={image} height={imageSize} />
                </Link>
            </div>
            <div className={`${styles.WordBreak} mx-2`}>
                <strong>{owner}</strong>
            </div>
            <div className={`text-right ${!mobile && "ml-auto"}`}>
                {!mobile &&
                    currentUser &&
                    !is_owner &&
                    (following_id ? (
                        <Button
                            className={btnStyles.Follow}
                            onClick={() => handleUnfollow(profile)}
                            aria-label="unfollow"
                        >
                            <i
                                className={`${styles.UnfollowIcon} fa-solid fa-user-xmark`}
                            ></i>
                        </Button>
                    ) : (
                        <Button
                            className={btnStyles.Follow}
                            onClick={() => handleFollow(profile)}
                            aria-label="follow"
                        >
                            <i
                                className={`${styles.FollowIcon} fa-solid fa-user-plus`}
                            ></i>
                        </Button>
                    ))}
            </div>
        </div>
    );
};

export default Profile;
