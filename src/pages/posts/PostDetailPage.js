import React from 'react';

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import appStyles from "../../App.module.css"
import styles from "../../styles/PostDetailPage.module.css"
import { useParams } from 'react-router-dom';

const PostDetailPage = () => {

    const {id} = useParams

  return (
    <Container className='h-100'>
        <Row className={styles.Row}>
            <Col>
            <p>Placeholder text</p>
            <p>Post component</p>
            <Container>
                Comments
            </Container>

            </Col>
        </Row>
    </Container>
  )
}

export default PostDetailPage