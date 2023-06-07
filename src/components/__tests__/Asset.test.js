import React from "react";
import { render } from "@testing-library/react";
import Asset from "../Asset";

describe("Asset component", () => {
//   it("renders the spinner when 'spinner' prop is true", () => {
//     const { container } = render(<Asset spinner={true} />);
//     const spinnerElement = container.querySelector("div.spinner-border");
//     expect(spinnerElement).toBeInTheDocument();
//   });

  it("does not render the spinner when 'spinner' prop is false", () => {
    const { container } = render(<Asset spinner={false} />);
    const spinnerElement = container.querySelector("div.spinner-border");
    expect(spinnerElement).not.toBeInTheDocument();
  });

  it("renders the image when 'src' prop is provided", () => {
    const src = "https://example.com/image.jpg";
    const { container } = render(<Asset src={src} />);
    const imgElement = container.querySelector(`img[src="${src}"]`);
    expect(imgElement).toBeInTheDocument();
  });

  it("does not render the image when 'src' prop is not provided", () => {
    const { container } = render(<Asset />);
    const imgElement = container.querySelector("img");
    expect(imgElement).not.toBeInTheDocument();
  });

  it("renders the message when 'message' prop is provided", () => {
    const message = "This is a test message";
    const { getByText } = render(<Asset message={message} />);
    const messageElement = getByText(message);
    expect(messageElement).toBeInTheDocument();
  });

  it("does not render the message when 'message' prop is not provided", () => {
    const { container } = render(<Asset />);
    const messageElement = container.querySelector("p");
    expect(messageElement).not.toBeInTheDocument();
  });
});
