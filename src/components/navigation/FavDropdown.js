import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getId } from '../../util';
import { Link } from 'react-router-dom';

export const FavDropdown = (props) => {

    return (
        <>
            { props.favoritesToDisplay &&
                <NavDropdown title={props.title} id="basic-nav-dropdown" >
                    <p className="mx-4"><em>Find your favorites here</em></p>
                    {props.favoritesToDisplay.map((f, index) => <NavDropdown.Item
                        key={index}
                        as={Link}
                        to={props.url + getId(f.url)}>
                        {f[props.keyToPrint]}
                    </NavDropdown.Item>)}
                </NavDropdown>
            }
        </>


    )
}