import React from 'react'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getId } from '../../util';

// received params :
// props.name : for each char, the char name
// props.charurl : for each char, the char URL

export class CharFilmList extends React.Component {

    
    render() {

        const id = getId(this.props.filmURL)
        const movieLink = "/films/" + id;
 
            return (
                <Row>
                     <Col>
                     <Link to={movieLink}>
                       {this.props.title}
                    </Link>
                    </Col>
                </Row>
        )
    }
}