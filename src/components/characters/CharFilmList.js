import React from 'react'
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getId, renderComponent } from '../../util';

// This component renders the movies in which the characters appears 

// received params :
// props.name : for each char, the char name
// props.charurl : for each char, the char URL

export const CharFilmList = (props) => {
        
 
            return (
                <Row className="text-left">
                <Col><p><strong>Movies</strong></p></Col>
                <Col> {/* lets check the loading status and render accordingly */}
                    {renderComponent(props.areFilmsLoading, props.areFilmsError, 
                    props.films.map((film) => 
                    <Link 
                    key={getId(film.url)}
                    to={"/films/" + getId(film.url)}>
                    <li>{film.title}</li>
                    </Link>)
                    )}  
                </Col>
                
            </Row>
        )
    }