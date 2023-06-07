import { render, screen, fireEvent } from "@testing-library/react";
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

test("renders about link for a logged in user", async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <NavBar />
            </CurrentUserProvider>
        </Router>
    );

    const aboutLink = await screen.findByText("About");
});

test("renders tutorials link for a logged in user", async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <NavBar />
            </CurrentUserProvider>
        </Router>
    );

    const tutorialLink = await screen.findByText("Tutorials");
    expect(tutorialLink).toBeInTheDocument();
});

test("renders signup button when user logs out", async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <NavBar />
            </CurrentUserProvider>
        </Router>
    );

    const signOutLink = await screen.findByRole('button', {name: "Sign out"})
});
