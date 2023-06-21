import React from "react";
import styles from "../styles/Avatar.module.css";

/**
 * Adapted from code provided in CI 'Moments' walkthrough.
 */
const Avatar = ({ src, height = 35, text }) => {
    return (
        <span className={styles.AvatarSpan}>
            <img
                className={styles.Avatar}
                src={src}
                height={height}
                width={height}
                alt="profile"
            />
            {text}
        </span>
    );
};

export default Avatar;
