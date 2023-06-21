import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";
import { unfollowHelper } from "../utils/utils";
import { followHelper } from "../utils/utils";

/**
 * Adapted from code provided in CI 'Moments' walkthrough.
 */
const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({
        pageProfile: { results: [] },
        topProfiles: { results: [] },
    });

    const currentUser = useCurrentUser();

    /**
    * Helper function for following user profiles.
    * Creates follower instance and updates follower-count.
    */
    const handleFollow = async (clickedProfile) => {
        try {
            const { data } = await axiosRes.post("/followers/", {
                followed: clickedProfile.id,
            });

            setProfileData((prevState) => ({
                ...prevState,
                pageProfile: {
                    results: prevState.pageProfile.results.map((profile) =>
                        followHelper(profile, clickedProfile, data.id)
                    ),
                },
                topProfiles: {
                    ...prevState.topProfiles,
                    results: prevState.topProfiles.results.map((profile) =>
                        followHelper(profile, clickedProfile, data.id)
                    ),
                },
            }));
        } catch (err) {}
    };

    /**
    * Helper function for un-follow user profile.
    * Deletes instance from API and updates follow-count.
    */
    const handleUnfollow = async (clickedProfile) => {
        try {
            await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);
            setProfileData((prevState) => ({
                ...prevState,
                pageProfile: {
                    results: prevState.pageProfile.results.map((profile) =>
                        unfollowHelper(profile, clickedProfile)
                    ),
                },
                topProfiles: {
                    ...prevState.topProfiles,
                    results: prevState.topProfiles.results.map((profile) =>
                        unfollowHelper(profile, clickedProfile)
                    ),
                },
            }));
        } catch (err) {}
    };

    /**
    * Adapted from code provided in CI 'Moments' walkthrough.
    * Retrieves profile data from API.
    * Order profiles based on most followers.
    */
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
            } catch (err) {}
        };
        handleMount();
    }, [currentUser]);

    return (
        <ProfileDataContext.Provider value={profileData}>
            <SetProfileDataContext.Provider
                value={{ setProfileData, handleFollow, handleUnfollow }}
            >
                {children}
            </SetProfileDataContext.Provider>
        </ProfileDataContext.Provider>
    );
};
