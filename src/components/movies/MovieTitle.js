import React from 'react'
import { Link } from 'react-router-dom';
import { getId } from '../../util';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

// props inherited from parents : 
// props.title : movie title
// props.filmURL : movie url of which we can extract the id 

export const MovieTitle = (props) => {

    const id = getId(props.filmURL)
    const movieLink = "/films/" + id;

    return (

        <Card className="m-2">
            <Card.Img className="card-img-top" src={"/images/movies/cards/" + id + ".jpg"} />
            <Card.Body>
                <Card.Text><strong>{props.title}</strong></Card.Text>
            </Card.Body>
            <Card.Footer>
                <Link className="movie-title-link" to={movieLink}>
                    <Button variant="dark">
                        Details
                    </Button>
                </Link>
            </Card.Footer>
        </Card>

    )
}
