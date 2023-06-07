import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../NavBar";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";

test("renders navbar component", () => {
    render(
        <Router>
            <NavBar />
        </Router>
    );

    // screen.debug();
    const signUpLink = screen.getByRole("link", { name: "Sign up" });
    expect(signUpLink).toBeInTheDocument();
});

test("renders posts link for a logged in user", async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <NavBar />
            </CurrentUserProvider>
        </Router>
    );

    const aboutLink = await screen.findByText("About");
});
