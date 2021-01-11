import React from 'react'
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getId } from '../../util';

// received params :
// props.name : for each char, the char name
// props.charurl : for each char, the char URL

export class CharactersList extends React.Component {

    render() {

        let id = getId(this.props.charURL)
        let charLink = "/people/" + id + "/" + this.props.currentFilmID

        return (
                <Row>
                     <Col>
                     <Link to={charLink}>
                       {this.props.name}
                    </Link>
                    </Col>
                </Row>
        )
    }
}
