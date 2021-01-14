import React from 'react'
import axios from 'axios'
import { CharactersList } from '../characters'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

import './MovieDetails.css'



export class MovieDetails extends React.Component {

    state = {
        currentFilmID: null,
        currentFilm: {},
        characters: [],
        currentFilmImg: '',
        status: 'initial',
        isFavorite: false
    }

    componentDidMount() {
        this.getFilmDetails();
    }

    // componentDidUpdate(oldProps) {
    //     if (oldProps.match.params.filmID !== this.props.match.params.filmID) {
    //         this.getFilmDetails();
    //     }

    // }

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
                    currentFilmImg: "/images/movies/" + filmID + ".jpg",
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
            <>
                {this.state.characters
                    .map(char => <CharactersList currentFilmID={this.state.currentFilmID} name={char.name} charURL={char.url} />)}
            </>
        )
    }

    // addToFavorite = () => {
    //     if (this.state.isFavorite === false) {
    //         return (
    //             this.setState({
    //                 isFavorite: true
    //             })
    //         )
    //     }
    //     else if (this.state.isFavorite === true) {
    //         return (
    //             this.setState({
    //                 isFavorite: false
    //             })
    //         )
    //     }
    // }


    render() {
        const currentFilmID = this.state.currentFilmID;
        console.log(this.state.currentFilmID)
        return (
            <>
                <Row className="p-2 m-2 text-center mx-auto">
                    <Col><h1>{this.state.currentFilm.title}</h1></Col>
                </Row>
                {
                    currentFilmID ?
                        <>

                            <Container className="movie-details-container text-center mx-auto">

                                <div className="left-part-lg">
                                    <Row>
                                        <Col><Image rounded className="movie-cover img-thumbail" src={this.state.currentFilmImg} /></Col>
                                    </Row>
                                </div>
                                <div className="right-part-lg">
                                    <Row className="p-3">
                                        <Col><h2>About the movie</h2></Col>
                                    </Row>

                                    <Row className="text-left">
                                        <Col><p><strong>Director</strong></p></Col>
                                        <Col>{this.state.currentFilm.director}</Col>
                                    </Row>
                                    <Row className="text-left">
                                        <Col><p><strong>Issue Number</strong></p></Col>
                                        <Col>{this.state.currentFilm.episode_id}</Col>
                                    </Row>
                                    <hr></hr>
                                    <Row className="text-left">
                                        <Col><p><strong>Characters</strong></p></Col>
                                        <Col>{this.renderCharacters()}</Col>
                                    </Row>
                                </div>
                            </Container>
                            <Container><hr></hr>
                                <Row className="p-3 text-center">
                                    <Col><h2>What's the story?</h2>
                                    </Col>
                                </Row>
                                <Row className="p-4 text-justify"><em><p>{this.state.currentFilm.opening_crawl}</p></em></Row>
                                <hr></hr>
                            </Container>
                            <Container className="text-center">
                                <footer>
                                    <Link to={"/films"}><Button variant="dark" className="m-2">Back to films</Button></Link>
                                    <Button onClick={() => this.props.addMovieToFavorites(this.state.currentFilm)} variant="dark" className="m-2">Add to favorite</Button>
                                </footer>
                            </Container>

                        </>
                        : null
                    
                }
            </>
        )

    }
}

