import React from "react";
import styles from "../styles/PageNotFound.module.css";
import Container from "react-bootstrap/Container";
import noResults from "../assets/nosearchresults.png";
import Asset from "./Asset";
import Button from "react-bootstrap/Button";
import btnStyles from "../styles/Button.module.css";
import { useHistory } from "react-router-dom";

const PageNotFound = () => {
    const history = useHistory();

    return (
        <Container className={styles.Container}>
            <Asset
                src={noResults}
                message={
                    "Sorry, the page you're looking for has either moved or doesn't exist"
                }
            />
            <Button
                className={`${btnStyles.Pink} ${btnStyles.Button} ${styles.GoBack}`}
                onClick={() => history.goBack()}
            >
                Go back
            </Button>
        </Container>
    );
};

export default PageNotFound;
