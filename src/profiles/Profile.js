import React from "react";
import styles from "../styles/Profile.module.css";
import btnStyles from "../styles/Button.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const Profile = (props) => {
    const { profile, mobile, imageSize = 60 } = props;
    const { id, following_id, image, owner } = profile;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    return <div className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}>
        <div>
            <Link to={`/profiles/${id}`} className="align-self-center"></Link>
        </div>
    </div>;
};

export default Profile;
