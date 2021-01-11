import React from 'react'
import axios from 'axios'
import { CharactersList } from '../characters'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'

import './MovieDetails.css'



export class MovieDetails extends React.Component {

    state = {
        currentFilmID: null,
        currentFilm: {},
        characters: [],
        currentFilmImg: '',
        status: 'initial',
        isFavorite : false
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

    addToFavorites = () => {
        if (this.state.isFavorite === false) {
          return (
                this.setState ({
                    isFavorite: true
                })

            )
        }
        else if (this.state.isFavorite === true) {
            return (
                this.setState ({
                    isFavorite: false
                })
            )
        }
    }


    render() {
        const currentFilmID = this.state.currentFilmID;
        console.log(this.state.currentFilmID)
        return (
            <Container className="mx-auto">
                {
                    currentFilmID ?
                        <Card fluid className="text-center mx-auto">
                            <Card.Header>
                                <h2>{this.state.currentFilm.title}</h2>
                            </Card.Header>
                            <Card.Body>
                                <Card.Img variant="top" className="movie-cover" src={this.state.currentFilmImg} />
                                <Card.Text className="px-2">{this.state.currentFilm.opening_crawl}</Card.Text>
                                <ListGroup>
                                    <ListGroupItem ><Row >
                                        <Col>Director</Col>
                                        <Col>{this.state.currentFilm.director}</Col></Row>
                                    </ListGroupItem>
                                    <ListGroupItem><Row className="table-lign">
                                        <Col>Issue Number</Col>
                                        <Col>{this.state.currentFilm.episode_id}</Col></Row>
                                    </ListGroupItem>
                                    <ListGroupItem><Row className="table-lign">
                                        <Col>Issue Number</Col>
                                        <Col>{this.state.currentFilm.episode_id}</Col></Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row className="table-lign">
                                            <Col>Characters</Col>
                                            <Col>{this.renderCharacters()}</Col></Row>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card.Body>
                            <Card.Footer>
                                <div className="footer-btns">
                                    <div><Button onClick={this.addToFavorites} variant="outline-secondary">Add To Favorites</Button></div>
                                    <div><Link to={"/"}><Button variant="dark" className="my-2">Back to films</Button></Link></div>
                                </div>
                            </Card.Footer>
                        </Card>
                        : null
                }
            </Container>
        )

    }
}

