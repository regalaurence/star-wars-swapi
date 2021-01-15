import React from 'react'
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getId } from '../../util';

// This component renders the movies in which the characters appears 

// received params :
// props.name : for each char, the char name
// props.charurl : for each char, the char URL

export const CharFilmList = (props) => {

        const id = getId(props.filmURL)
        const movieLink = "/films/" + id;
 
            return (
                <Row>
                     <Col>
                     <Link to={movieLink}>
                       {props.title}
                    </Link>
                    </Col>
                </Row>
        )
    }