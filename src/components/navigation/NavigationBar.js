import React from 'react'
import axios from 'axios'
import { FavDropdown } from '.'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from "react-router-bootstrap";
import { NavAllMovies } from '.';

export class NavigationBar extends React.Component {

    state = {
        allMovies: [],
        isLoading: true,
        isError: false
    }

    componentDidMount() {
        axios.get('http://swapi.dev/api/films')
            .then((response) => {
                this.setState({
                    allMovies: response.data.results,
                    isLoading: false
                })
            })
            .catch((error) => {
                this.setState({
                    isError: true
                })
            })
    }


    render() {

        return (
            <Navbar bg="light" expand="lg">
                <LinkContainer to="/films"><Navbar.Brand>A Star Wars Wiki</Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavAllMovies
                            isLoading={this.state.isLoading}
                            isError={this.state.isError}
                            allMovies={this.state.allMovies}
                        />
                        <FavDropdown title={"Favorite Movies"}
                            favoritesToDisplay={this.props.favoriteMovies}
                            keyToPrint={"title"}
                            url={"/films/"}
                        />
                        <FavDropdown title={"Favorite Characters"}
                            favoritesToDisplay={this.props.favoriteCharacters}
                            keyToPrint={'name'}
                            url={'/people/'} />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
<>
</>
