import { render } from "@testing-library/react"
import { BrowserRouter, Router } from "react-router-dom"
import NavBar from "../NavBar"

test("renders navbar component", () => {
    render(<Router>
        <NavBar />
    </Router>)
})