import React from 'react'
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getId, renderComponent } from '../../util';

// received params :
// props.name : for each char, the char name
// props.charurl : for each char, the char URL

export const CharactersList = (props) => {


        return (
                <>
                        <Row className="text-left">
                                <Col><p><strong>Characters</strong></p></Col>
                                {/* lets check the states of characters data fetching and render accordingly */}
                                <Col>{renderComponent(props.charLoading, props.charError, props.characters
                                        .map(char => <Link
                                                key={getId(char.url)}
                                                to={"/people/" + getId(char.url)}>
                                                <li>{char.name}</li>
                                        </Link>))}
                                </Col>
                        </Row>
                </>
        )
}

