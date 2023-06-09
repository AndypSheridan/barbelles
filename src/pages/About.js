import React from 'react'
import styles from "../styles/About.module.css"
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

const About = () => {
  return (
    <Container className={styles.AboutContainer}>
        <Row>
            <Col>
            Hello there
            </Col>
        </Row>
    </Container>
  )
}

export default About