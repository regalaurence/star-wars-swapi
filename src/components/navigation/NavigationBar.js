import React from 'react'
import axios from 'axios'
import { FavMovies, FavChar } from '.'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from "react-router-bootstrap";
import { AllMovies } from '.';

export class NavigationBar extends React.Component {

    state = {
        allMovies: [],
        isLoading: true,
        isError: false
    }

    componentDidMount() {
        axios.get('https://swapi.dev/api/films')
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
        console.log("FAVORITES : " + this.props.favoriteMovies)
        return (
            <Navbar bg="light" expand="lg">
                <LinkContainer to="/films"><Navbar.Brand>A Star Wars Wiki</Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <AllMovies 
                            isLoading={this.state.isLoading}
                            isError={this.state.isError}
                            allMovies={this.state.allMovies}
                        />
                        <FavMovies favoriteMovies={this.props.favoriteMovies}/>
                        <FavChar favoriteCharacters={this.props.favoriteCharacters}/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

