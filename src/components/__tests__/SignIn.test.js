import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SignIn from "../SignIn";

describe("SignIn", () => {
    test("renders sign-in form with username and password fields", () => {
        render(<SignIn />);

        const usernameInput = screen.getByPlaceholderText("Username");
        const passwordInput = screen.getByPlaceholderText("Password");

        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    });

    test("handles form submission", async () => {
        render(<SignIn />);

        const usernameInput = screen.getByPlaceholderText("Username");
        const passwordInput = screen.getByPlaceholderText("Password");
        const submitButton = screen.getByText("Submit");

        fireEvent.change(usernameInput, { target: { value: "admin" } });
        fireEvent.change(passwordInput, {
            target: { value: "testpasswordadmin" },
        });

        fireEvent.click(submitButton);

        // Here, you can add your assertions to test the expected behavior after form submission
        // For example, you can use `waitFor` to wait for an element to appear in the DOM,
        // or check if a function was called, or check for a specific error message, etc.

        // Example assertion:
        // const successMessage = await screen.findByText(/Signed in as testuser/i);
        // expect(successMessage).toBeInTheDocument();
    });
});
