import React from "react";

/**
 * Social links component.
 */
const SocialLinks = () => {
	return (
		<div>
			<h3 className="my-3">Follow us</h3>
			<a
				href="https://www.youtube.com/"
				target="_blank"
				rel="noopener noreferrer"
				className="px-2"
				aria-label="youtube"
				title="youtube"
			>
				<i className="fa-brands fa-square-youtube fa-3x"></i>
			</a>
			<a
				href="https://www.instagram.com/"
				target="_blank"
				rel="noopener noreferrer"
				className="px-2"
				aria-label="instagram"
				title="instagram"
			>
				<i className="fa-brands fa-square-instagram fa-3x"></i>
			</a>
			<a
				href="https://www.facebook.com/"
				target="_blank"
				rel="noopener noreferrer"
				className="px-2"
				aria-label="facebook"
				title="facebook"
			>
				<i className="fa-brands fa-square-facebook fa-3x"></i>
			</a>
			<a
				href="https://www.twitter.com/"
				target="_blank"
				rel="noopener noreferrer"
				className="px-2"
				aria-label="twitter"
				title="twitter"
			>
				<i className="fa-brands fa-square-twitter fa-3x"></i>
			</a>
		</div>
	);
};

export default SocialLinks;
