import React from 'react'
import axios from 'axios'
import { CharactersList } from '../characters'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import { renderComponent, populateInfo } from '../../util';
import './MovieDetails.css'
import { ToggleFav } from '../navigation';



export class MovieDetails extends React.Component {

    state = {
        currentFilmID: null,
        currentFilm: {},
        currentFilmImg: '',
        charLoading: true,
        filmInfoLoading: true,
        charError: false,
        filmError: false,
        isFavorite: false,
        characters: {
            items: [],
            status: {
                error: false,
                isNotEmpty: true,
                loading: false
            }
        }, 
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
                if (this.props.currentFavoriteMoviesTitles.includes(this.state.currentFilm.title)) {
                    this.setState({
                        isFavorite : true
                    })
                }
                return populateInfo('characters', response.data.characters, this)

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
        if (!this.props.currentFavoriteMoviesTitles.includes(this.state.currentFilm.title)) {
            this.props.addToFavorites("favoriteMovies", this.props.currentFavoriteMovies, this.state.currentFilm)
            this.setState({
                isFavorite : true
            })
        }

        else {
            this.props.removeObjFromFavoriteMovies("favoriteMovies", this.props.currentFavoriteMovies, this.state.currentFilm.title)
            this.setState({
                isFavorite : false
            })
        }
    }

    render() {
        console.log("THE CHARACRERS" + this.state.characters.items)
  
        return (
            <>
                <Row className="p-2 m-2 text-center mx-auto">
                    <Col><h1>{this.state.currentFilm.title}</h1></Col>
                </Row>
                {/* let's check the states and render accordingly */}
                {renderComponent(this.state.filmInfoLoading, this.state.filmError,
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
                            {this.state.characters.items && 
                            <CharactersList
                                   charLoading={this.state.characters.status.loading}
                                   charError={this.state.characters.error}
                                   characters={this.state.characters.items}
                            />
                            }
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