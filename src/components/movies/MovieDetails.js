import React from 'react'
import axios from 'axios'
import { CharactersList } from '../characters'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './MovieDetails.css'



export class MovieDetails extends React.Component {

    state = {
        currentFilmID: null,
        currentFilm: {},
        characters: [],
        status: 'initial'
    }

    componentDidMount() {
        this.getFilmDetails();
    }


    componentDidUpdate(oldProps) {
        if (oldProps.match.params.filmID !== this.props.match.params.filmID) {
            this.getFilmDetails();
        }

    }

    getFilmDetails() {
        if (this.state.filmID) {
            return;
        }
        const filmID = this.props.match.params.filmID
        const url = "https://swapi.dev/api/films/" + filmID + "/";
        axios.get(url)
            .then(response => {
                this.setState({
                    currentFilmID: filmID,
                    currentFilm: response.data,
                    status: 'fetching'
                })
                this.populateCharacters(response.data.characters)
            })
    }

    populateCharacters = (arrayOfCharURL) => {
        console.log(arrayOfCharURL)
        let charPromises = arrayOfCharURL.map(charURL =>
            axios.get(charURL)
        )

        return Promise.all(charPromises)
            .then((response) => {
                console.log('res', response)
                const characters = response.map(char => char.data)
                this.setState({
                    characters: characters,
                    status: 'final'
                })
            }).catch((error) => {
                this.setState({ status: 'error' })
            })
    }


    //this is for the rendering of the characters names, with loading info for UX
    renderCharacters = () => {
        if (this.state.status === 'fetching' || this.state.status === 'initial') {
            return 'Loading...'
        }
        if (this.state.status === 'error') {
            return 'Encountered an error, please try again'
        }
        return (
                <Col>
                    {this.state.characters
                        .map(char => <CharactersList name={char.name} charURL={char.url} />)}

                    <Row><Link to={"/"}>Back to films</Link></Row>
                </Col>
        )
    }



    render() {
        const currentFilmID = this.state.currentFilm;

        return (
            <Container fluid className="movie-details-container">
                {
                    currentFilmID ?
                        <Col>
                            <Row className="movie-details-container"><h1>{this.state.currentFilm.title}</h1></Row>
                            <Row className="movie-details-container">Director : {this.state.currentFilm.director}</Row>
                            <Row className="movie-details-container">Characters : {this.renderCharacters()}</Row>
                        </Col>
                        : null
                }
            </Container>
        )

    }
}