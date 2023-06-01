import React from "react";
import styles from "../styles/Profile.module.css";
import btnStyles from "../styles/Button.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const Profile = (props) => {
    const { profile, mobile, imageSize = 60 } = props;
    const { id, following_id, image, owner } = profile;

    const currentUser = useCurrentUser();
    

    return <div>Profile</div>;
};

export default Profile;
