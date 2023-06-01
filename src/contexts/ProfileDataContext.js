import { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from "./CurrentUserContext";
import { axiosReq } from "../api/axiosDefaults";

export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(useSetProfileData);

export const ProfileDataProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({
        pageProfile: { results: [] },
        topProfiles: { results: [] },
    });

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
        <ProfileDataContext.Provider value={profileData}>
            <SetProfileDataContext.Provider value={setProfileData}>
                {children}
            </SetProfileDataContext.Provider>
        </ProfileDataContext.Provider>
    )
}

