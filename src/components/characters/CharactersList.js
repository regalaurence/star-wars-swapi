import React from 'react'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// received params :
// props.name : for each char, the char name
// props.charurl : for each char, the char URL

export class CharactersList extends React.Component {

    render() {

        let splittedURL = this.props.charURL.split('/')
        splittedURL.pop()
        let charID = splittedURL.splice(-1).pop()

        return (
                <Row>
                     <Col>
                     <Link to={"/people/" + charID}>
                       {this.props.name}
                    </Link>
                    </Col>
                </Row>
        )
    }
}
