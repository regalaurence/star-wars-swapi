import React from 'react'
import axios from 'axios'
import { CharactersList } from '../characters'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import { render } from '../../util';
import './MovieDetails.css'
import { ToggleFav } from '../navigation';



export class MovieDetails extends React.Component {

    state = {
        currentFilmID: null,
        currentFilm: {},
        characters: [],
        currentFilmImg: '',
        charLoading: true,
        filmInfoLoading: true,
        charError: false,
        filmError: false,
        isFavorite: false
    }

    componentDidMount() {
        this.getFilmDetails()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.filmID !== this.props.match.params.filmID) {
        this.getFilmDetails()
        }
      }

    getFilmDetails() {
        const filmID = this.props.match.params.filmID
        const url = "https://swapi.dev/api/films/" + filmID + "/";
        axios.get(url)
            .then(response => {
                this.setState({
                    currentFilmID: filmID,
                    currentFilm: response.data,
                    currentFilmImg: "/images/movies/" + filmID + ".jpg",
                    filmInfoLoading: false
                })
                this.populateCharacters(response.data.characters)
                if (this.props.currentFavoriteMovies.includes(this.state.currentFilm.title)) {
                    this.setState({
                        isFavorite : true
                    })
                }
            })
            .catch((error) => {
                this.setState({
                    filmError: true
                })
            })
    }

    populateCharacters = (arrayOfCharURL) => {
        // console.log(arrayOfCharURL)
        let charPromises = arrayOfCharURL.map(charURL =>
            axios.get(charURL)
        )

        return Promise.all(charPromises)
            .then((response) => {
                console.log('res', response)
                const characters = response.map(char => char.data)
                this.setState({
                    characters: characters,
                    charLoading: false
                })
            }).catch((error) => {
                this.setState({
                    charError: true
                })
            })
    }

    toggleFavoriteHandler = () => {
        if (!this.props.currentFavoriteMovies.includes(this.state.currentFilm.title)) {
            this.props.addMovieToFavorites(this.state.currentFilm)
            this.setState({
                isFavorite : true
            })
        }
        else {
            this.props.removeMovieFromFavorites(this.props.currentFavoriteMovies, this.state.currentFilm.title)
            this.setState({
                isFavorite : false
            })
        }
    }

    render() {

        //we render these components down under, put here for readability
        let eachCharName = this.state.characters
            .map(char => <CharactersList currentFilmID={this.state.currentFilmID} name={char.name} charURL={char.url} />)

        return (
            <>
                <Row className="p-2 m-2 text-center mx-auto">
                    <Col><h1>{this.state.currentFilm.title}</h1></Col>
                </Row>
                {/* let's check the states and render accordingly */}
                {render(this.state.filmInfoLoading, this.state.filmError,
                    <><Container className="movie-details-container text-center mx-auto">
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
                                {/* lets check the states of characters data fetching and render accordingly */}
                                <Col>{render(this.state.charLoading, this.state.charError, eachCharName)}</Col>
                            </Row>
                        </div>
                    </Container>
                        <Container className="description">
                            <hr></hr>
                            <Row className="p-3 text-center">
                                <Col><h2>What's the story?</h2></Col>
                            </Row>
                            <Row className="p-4 text-justify">
                                <em><p>{this.state.currentFilm.opening_crawl}</p></em>
                            </Row>
                            <hr></hr>
                        </Container>
                        <Container className="text-center footer-buttons">
                            <footer>
                                <Link to={"/films"}><Button variant="dark" className="m-2">Back to films</Button></Link>
                                <ToggleFav 
                                isFavorite={this.state.isFavorite} 
                                toggleFavoriteHandler={this.toggleFavoriteHandler} 
                                currentFavorites={this.props.currentFavoriteMovies}
                                toAdd={this.state.currentFilm.title}
                                 />
                            </footer>
                        </Container>
                    </>)
                }
            </>
        )
    }
}

