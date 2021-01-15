import React from 'react'
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getId } from '../../util';

// received params :
// props.name : for each char, the char name
// props.charurl : for each char, the char URL

export const CharactersList = (props) => {

        let id = getId(props.charURL)
        let charLink = "/people/" + id 

        return (
                <Row>
                     <Col>
                     <Link to={charLink}>
                       {props.name}
                    </Link>
                    </Col>
                </Row>
        )
    }
