import React, { useState } from "react";
import UploadIcon from "../../assets/uploadIcon.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../styles/PostShareEditForm.module.css";
import appStyles from "../../App.module.css";

const PostShareForm = () => {
    const [errors, setErrors] = useState();

    const textFields = (
        <div>
            <Button onClick={() => {}}>cancel</Button>
            <Button onClick={() => {}} type="submit">
                Share
            </Button>
        </div>
    );

    return (
        <Form className={styles.PostShareEditForm}>
            <Row>
                <Col>
                    <Container>
                    <Form.Group className="text-center">
              
              <Form.Label
                className="d-flex justify-content-center"
                htmlFor="image-upload"
              >
                ASSET
              </Form.Label>

          </Form.Group>
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
            </Row>
        </Form>
    );
};

export default PostShareForm;
