import { render, screen } from "@testing-library/react";
import SocialLinks from "../SocialLinks";

describe("SocialLinks", () => {
    it("renders social media links with correct URLs", () => {
        render(<SocialLinks />);

        const youtubeLink = screen.getByRole("link", { name: "youtube" });
        expect(youtubeLink).toHaveAttribute("href", "https://www.youtube.com/");

        const instagramLink = screen.getByRole("link", { name: "instagram" });
        expect(instagramLink).toHaveAttribute(
            "href",
            "https://www.instagram.com/"
        );

        const facebookLink = screen.getByRole("link", { name: "facebook" });
        expect(facebookLink).toHaveAttribute(
            "href",
            "https://www.facebook.com/"
        );

        const twitterLink = screen.getByRole("link", { name: "twitter" });
        expect(twitterLink).toHaveAttribute("href", "https://www.twitter.com/");
    });

    it("renders social media icons", () => {
        render(<SocialLinks />);

        const youtubeIcon = screen.getByTitle("youtube");
        expect(youtubeIcon).toBeInTheDocument();

        const instagramIcon = screen.getByTitle("instagram");
        expect(instagramIcon).toBeInTheDocument();

        const facebookIcon = screen.getByTitle("facebook");
        expect(facebookIcon).toBeInTheDocument();

        const twitterIcon = screen.getByTitle("twitter");
        expect(twitterIcon).toBeInTheDocument();
    });

    it('renders the "Follow us" heading', () => {
        render(<SocialLinks />);

        const heading = screen.getByRole("heading", { name: "Follow us" });
        expect(heading).toBeInTheDocument();
    });
});
