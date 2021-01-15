import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getId } from '../../util';
import { Link } from 'react-router-dom';

export const FavMovies = (props) => {

    console.log(props.favoriteMovies)
    return (
    
        <NavDropdown title="Favorites Movies" id="basic-nav-dropdown">
        <p className="mx-4"><em>Find your favorites here</em></p>
            {props.favoriteMovies.map(movie => <NavDropdown.Item as={Link} to={"/films/" + getId(movie.url)}>{movie.title}</NavDropdown.Item>)}
        </NavDropdown>
    )
}
