import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getId } from '../../util';
import { Link } from 'react-router-dom';

export const FavChar = (props) => {

    return (
    <>
        { props.favoriteCharacters &&
            <NavDropdown title="Favorite Characters" id="basic-nav-dropdown" >
                <p className="mx-4"><em>Find your favorites here</em></p>
                {props.favoriteCharacters.map(char => <NavDropdown.Item as={Link} to={"/people/" + getId(char.url)}>{char.name}</NavDropdown.Item>)}
            </NavDropdown>
        }
    </>


    )
}