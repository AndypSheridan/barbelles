import React, { useEffect, useState } from "react";
import appStyles from "../App.module.css";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const TopProfiles = () => {
    const [profileData, setProfileData] = useState({
        pageProfile: { results: [] },
        topProfiles: { results: [] },
    });

    const { topProfiles } = profileData;
    const currentUser = useCurrentUser();

    useEffect(() => {
        const handleMount = async () => {
            try{
                const {data} = await axiosReq.get('/profiles/?ordering=-followers_count')
                setProfileData(prevState => ({
                    ...prevState,
                    topProfiles: data,
                }))
            } catch(err) {
                console.log(err)
            }
        }
        handleMount()
    })

    return (
        <Container className={appStyles.Content}>
            <p>Top profiles</p>
        </Container>
    );
};

export default TopProfiles;
