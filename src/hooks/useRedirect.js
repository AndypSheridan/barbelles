import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

/**
 * Adapted from code provided in CI 'Moments' walkthrough.
 * Checks logged-in status with refresh token.
 * Redirects user to home page if not logged in.
 */
export const useRedirect = (userAuthStatus) => {
	const history = useHistory();
	useEffect(() => {
		const handleMount = async () => {
			try {
				await axios.post("/dj-rest-auth/token/refresh/");
				if (userAuthStatus === "loggedIn") {
					history.push("/");
				}
			} catch (err) {
				if (userAuthStatus === "loggedOut") {
					history.push("/");
				}
			}
		};
		handleMount();
	}, [history, userAuthStatus]);
};
