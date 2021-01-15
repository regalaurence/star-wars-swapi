import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getId } from '../../util';
import { Link } from 'react-router-dom';

export const FavChar = (props) => {

    console.log(props.favoriteMovies)
    return (
        <NavDropdown title="Favorites Characters" id="basic-nav-dropdown">
            <p className="mx-4"><em>Find your favorites here</em></p>
            {props.favoriteCharacters.map(char => <NavDropdown.Item as={Link} to={"/people/" + getId(char.url)}>{char.name}</NavDropdown.Item>)}
        </NavDropdown>

    )
}