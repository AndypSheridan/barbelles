import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/Profile.module.css";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

const Profile = (props) => {
    const { profile, mobile, imageSize = 60 } = props;
    const { id, following_id, image, owner } = profile;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const {handleFollow} = useSetProfileData

    return <div className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}>
        <div>
            <Link to={`/profiles/${id}`} className="align-self-center">
                <Avatar src={image} height={imageSize} />
            </Link>
        </div>
        <div className={`${styles.WordBreak} mx-2`}>
        <strong>{owner}</strong>
        </div>
        <div className={`text-right ${!mobile && 'ml-auto'}`}>
            {!mobile && currentUser && !is_owner && (
                following_id ? (
                    <Button onClick={()=>{}}>Unfollow</Button>
                ) : (
                    <Button onClick={()=>{}}>Follow</Button>
                )
            )}
        </div>
    </div>;
};

export default Profile;
