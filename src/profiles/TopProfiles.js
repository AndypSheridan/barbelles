import React, { useEffect, useState } from "react";
import appStyles from "../App.module.css";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Asset from "../components/Asset";

const TopProfiles = () => {
    const [profileData, setProfileData] = useState({
        pageProfile: { results: [] },
        topProfiles: { results: [] },
    });

    const { topProfiles } = profileData;
    const currentUser = useCurrentUser();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(
                    "/profiles/?ordering=-followers_count"
                );
                setProfileData((prevState) => ({
                    ...prevState,
                    topProfiles: data,
                }));
            } catch (err) {
                console.log(err);
            }
        };
        handleMount();
    }, [currentUser]);

    return (
        <Container className={appStyles.Content}>
            {topProfiles.results.length ? (
                <>
                    <p>Top profiles</p>
                    {topProfiles.results.map((profile) => (
                        <p key={profile.id}>{profile.owner}</p>
                    ))}
                </>
            ) : (
                <Asset spinner />
            )}
        </Container>
    );
};

export default TopProfiles;
