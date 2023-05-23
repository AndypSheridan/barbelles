import React from "react";
import Button from "react-bootstrap/Button";
import styles from "../styles/Button.module.css";

const CustomButton = ({title, type='button'}) => {
    return <Button type={type} className={styles.Button}>{title}</Button>;
};

export default CustomButton;
