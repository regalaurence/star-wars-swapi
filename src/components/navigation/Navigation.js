import React from 'react'
import axios from 'axios'
import { FavMovies, FavChar } from '.'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getId } from '../../util';



export class Navigation extends React.Component {

    state = {
        allMovies: null,
    }

    componentDidMount() {
        axios.get('https://swapi.dev/api/films')
            .then((response) => {
                this.setState({
                    allMovies: response.data.results
                })
            })
    }


    render() {
        console.log("FAVORITES : " + this.props.favoriteMovies)
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">A Star Wars Wiki</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Movies" id="basic-nav-dropdown">
                            {this.state.allMovies ? this.state.allMovies
                                .map(movie => <NavDropdown.Item href={"/films/" + getId(movie.url)}>{movie.title}</NavDropdown.Item>) : null}
                        </NavDropdown>
                        <FavMovies favoriteMovies={this.props.favoriteMovies}/>
                        <FavChar favoriteCharacters={this.props.favoriteCharacters}/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

