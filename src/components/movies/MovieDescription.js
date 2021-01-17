import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const MovieDescription = (props) => {

    return (
        <Container className="description">
            <hr></hr>
            <Row className="p-3 text-center">
                <Col><h2>What's the story?</h2></Col>
            </Row>
            <Row className="p-4 text-justify">
                <em><p>{props.opening_crawl}</p></em>
            </Row>
            <hr></hr>
        </Container>
    )
}