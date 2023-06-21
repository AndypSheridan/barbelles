import React from "react";
import { useProfileData } from "../../contexts/ProfileDataContext";
import styles from "../../styles/TopProfiles.module.css";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import Profile from "./Profile";

/**
* Display list of top profiles based on number of followers.
*/
const TopProfiles = ({ mobile }) => {
    const { topProfiles } = useProfileData();

    return (
        <Container
            className={`${appStyles.Content} ${styles.TopProfilesText} ${
                mobile && "d-lg-none text-center mb-3 mw-100"
            }`}
        >
            {topProfiles.results.length ? (
                <>
                    <p className={styles.P}>Top 'Belles</p>
                    {mobile ? (
                        <div className="d-flex justify-content-around">
                            {topProfiles.results.slice(0, 4).map((profile) => (
                                <Profile
                                    key={profile.id}
                                    profile={profile}
                                    mobile
                                />
                            ))}
                        </div>
                    ) : (
                        topProfiles.results.map((profile) => (
                            <Profile key={profile.id} profile={profile} />
                        ))
                    )}
                </>
            ) : (
                <Asset spinner />
            )}
        </Container>
    );
};

export default TopProfiles;
