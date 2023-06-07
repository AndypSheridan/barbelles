import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../NavBar";

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
