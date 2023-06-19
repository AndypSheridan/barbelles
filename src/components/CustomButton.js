import React from "react";
import Button from "react-bootstrap/Button";
import styles from "../styles/CustomButton.module.css";

const CustomButton = ({ title, type = "button" }) => {
	return (
		<Button type={type} className={styles.CustomButton}>
			{title}
		</Button>
	);
};

export default CustomButton;
