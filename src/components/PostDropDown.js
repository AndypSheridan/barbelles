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
        <Dropdown className="ml-auto" drop="down">
            <Dropdown.Toggle as={PostDropDownMenu} />

            <Dropdown.Menu className="text-center">
                <Dropdown.Item
                    className={styles.DropdownItem}
                    aria-label="edit"
                    onClick={() => {}}
                >
                    <i className="fa-regular fa-pen-to-square" />
                    Edit
                </Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    aria-label="delete"
                    onClick={() => {}}
                >
                    <i className="fa-reular fa-square-minus" />
                    Delete
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};
