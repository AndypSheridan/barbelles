import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useHistory } from "react-router-dom";

import styles from "../styles/PostDropDown.module.css";
import DropdownMenu from "react-bootstrap/DropdownMenu";
// import DropdownItem from "react-bootstrap/DropdownItem";
// import DeleteConfirmModal from "./DeleteConfirmModal";

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

const CommentDropDownMenu = React.forwardRef(({ onClick }, ref) => (
    <i
        className="fa-regular fa-square-caret-down"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    />
));

export const ProfileDropDown = ({ id }) => {
    const history = useHistory();
    return (
        <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="down">
            <Dropdown.Toggle as={PostDropDownMenu} />
            <DropdownMenu>
                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit`)}
                    aria-label="edit-profile"
                >
                    <i className="fas fa-edit" /> edit profile
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() =>
                        history.push(`/profiles/${id}/edit/username`)
                    }
                    aria-label="edit-username"
                >
                    <i className="far fa-id-card" />
                    change username
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() =>
                        history.push(`/profiles/${id}/edit/password`)
                    }
                    aria-label="edit-password"
                >
                    <i className="fas fa-key" />
                    change password
                </Dropdown.Item>
            </DropdownMenu>
        </Dropdown>
    );
};

export const ComponentDropDown = ({ handleEdit, handleDelete }) => {
    return (
        <Dropdown className="ml-auto" drop="down">
            <Dropdown.Toggle as={PostDropDownMenu} />

            <Dropdown.Menu
                popperConfig={{ strategy: "fixed" }}
                className="text-center"
            >
                <Dropdown.Item
                    className={styles.DropdownItem}
                    aria-label="edit"
                    onClick={handleEdit}
                >
                    <i className="fa-regular fa-pen-to-square" />
                    Edit
                </Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    aria-label="delete"
                    onClick={handleDelete}
                >
                    <i className="fa-regular fa-square-minus" />
                    Delete
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export const CommentDropDown = ({ handleCommentEdit, handleDelete }) => {
    return (
        <Dropdown className="ml-auto" drop="down">
            <Dropdown.Toggle as={CommentDropDownMenu} />

            <Dropdown.Menu
                popperConfig={{ strategy: "fixed" }}
                className="text-center"
            >
                <Dropdown.Item
                    className={styles.DropdownItem}
                    aria-label="edit"
                    onClick={handleCommentEdit}
                >
                    <i className="fa-regular fa-pen-to-square" />
                    Edit
                </Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    aria-label="delete"
                    onClick={handleDelete}
                >
                    <i className="fa-regular fa-square-minus" />
                    Delete
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

