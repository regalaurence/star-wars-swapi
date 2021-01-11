import React from 'react'
import { Link } from 'react-router-dom';
import { getId } from '../../util';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

// props inherited from parents : 
// props.title
// props.director
// props.characterURLS
// props.title



export const MovieTitle = (props) => {
    const id = getId(props.filmURL)
    const movieLink = "/films/" + id;
    return (
        <Row>
            <Col>
            <Link className="movie-title-link" to={movieLink}>
                <Button variant="dark" size="lg" className="my-1">
                    {props.title}
                </Button>
                </Link>
            </Col>
        </Row>
    )
}