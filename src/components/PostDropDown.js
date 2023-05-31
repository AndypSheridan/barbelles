import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

import styles from "../styles/PostDropDown.module.css";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const PostDropDownMenu = React.forwardRef(({ onClick }, ref) => (
    <i
        className="fa-regular fa-square-caret-down"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    />
));

export const PostDropDown = () => {
    return (
        <Dropdown className="ml-auto">
        <Dropdown.Toggle as={PostDropDownMenu} id="dropdown-custom-components">
            Custom toggle
        </Dropdown.Toggle>

        <Dropdown.Menu >
            <Dropdown.Item eventKey="1">Red</Dropdown.Item>
            <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
            <Dropdown.Item eventKey="3" active>
                Orange
            </Dropdown.Item>
            <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    )
}
