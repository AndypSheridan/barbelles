import React from "react";
import appStyles from "../../App.module.css";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import Profile from "./Profile";
import { useProfileData } from "../../contexts/ProfileDataContext";
import styles from "../../styles/TopProfiles.module.css"

const TopProfiles = ({ mobile }) => {
    
    const { topProfiles } = useProfileData();

    return (
        <Container
            className={`${appStyles.Content} ${
                mobile && "d-lg-none text-center mb-3 mw-100"
            }`}
        >
            {topProfiles.results.length ? (
                <>
                    <p className={styles.P}>Top 'Belles</p>
                    {mobile ? (
                        <div className="d-flex justify-content-around">
                            {topProfiles.results.slice(0, 4).map((profile) => (
                                <Profile key={profile.id} profile={profile} mobile />
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
