import React from 'react';

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import appStyles from "../../App.module.css"

const PostDetailPage = () => {

    

  return (
    <Container className='h-100'>
        <Row className=''>
            <Col>
            <p>Posts</p>
            <Container>
                Comments
            </Container>

            </Col>
        </Row>
    </Container>
  )
}

export default PostDetailPage