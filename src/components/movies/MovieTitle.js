import React from 'react'
import { Link } from 'react-router-dom';
import { getId } from '../../util';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

// props inherited from parents : 
// props.title
// props.director
// props.characterURLS
// props.title


export class MovieTitle extends React.Component {

    state = {
        favoriteMovies : []
    }

    updateFavoriteList = (movie) => {
        let favoriteMoviesCopy = [...this.state.favoriteMovies]
        let newFavoriteMovies = favoriteMoviesCopy.push(movie)
        this.setState ({
            favoriteMovies : newFavoriteMovies
        })
    }

    render () {

    const id = getId(this.props.filmURL)
    const movieLink = "/films/" + id;

    return (
        <Card className="m-2">
            <Card.Img className="card-img-top" src={"/images/movies/cards/" + id + ".jpg"} />
            <Card.Body>
                <Card.Text><strong>{this.props.title}</strong></Card.Text>
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
}
