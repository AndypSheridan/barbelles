import React from "react";
import { render, screen } from "@testing-library/react";
import Welcome from "../Welcome";

describe("Welcome Component", () => {
  it("renders the welcome message and description", () => {
    render(<Welcome />);

    // Assert the content
    expect(screen.getByText("Welcome to")).toBeInTheDocument();
    expect(
      screen.getByText("An inclusive online fitness community for women")
    ).toBeInTheDocument();
  });
});