import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../NavBar";

test("renders navbar component", () => {
    render(
        <Router>
            <NavBar />
        </Router>
    );
});
