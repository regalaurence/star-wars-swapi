import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getId } from '../../util';

export const FavChar = (props) => {

    console.log(props.favoriteMovies)
    return (
        <NavDropdown title="Favorites Characters" id="basic-nav-dropdown">
            <p className="mx-4"><em>Find your favorites here</em></p>
            {props.favoriteCharacters.map(char => <NavDropdown.Item href={"/people/" + getId(char.url)}>{char.name}</NavDropdown.Item>)}
        </NavDropdown>

    )
}