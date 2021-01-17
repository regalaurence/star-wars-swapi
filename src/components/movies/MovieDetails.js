import React from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { CharactersList } from '../characters'
import { MovieDescription } from '.'
import { renderComponent, populateInfo, replaceProtocol } from '../../util';
import { FooterButtons, InfoLine } from '../navigation';
import './MovieDetails.css'

// Props: 
// {...props} => i.e filmID 
// props.addToFavorites => a function that adds film to favorite list 
// props.removeFromFavorites=> a function that removes a film from favorite list
// props.currentFavoriteMoviesTitles => title of the movies currently likes
// props.currentFavoriteMovies => currently liked movies as objects 

export class MovieDetails extends React.Component {

    state = {
        film: {
            items: {
                currentFilmID: null,
                currentFilm: {},
                currentFilmImg: '',
            },
            status: {
                error: false,
                isNotEmpty: true,
                isLoading: true,
                isFavorite: false
            }
        },
        characters: {
            items: [],
            status: {
                error: false,
                isNotEmpty: true,
                loading: true
            }
        }
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
                let charactersURLs = replaceProtocol(response.data.characters)
                this.setState({
                    film: {
                        items: {
                            currentFilmID: filmID,
                            currentFilm: response.data,
                            currentFilmImg: "/images/movies/" + filmID + ".jpg",
                        },
                        status: {
                            ...this.state.film.status,
                            isLoading: false,
                        }
                    },
                    characters: {
                        ...this.state.characters
                    }
                })
                if (this.props.currentFavoriteMoviesTitles.includes(this.state.film.items.currentFilm.title)) {
                    this.setState({
                        film: {
                            ...this.state.film,
                            status: {
                                ...this.state.film.status,
                                isFavorite: true,
                            }
                        },
                        characters: {
                            ...this.state.characters
                        }
                    })
                }
                return populateInfo('characters', charactersURLs, this)
            })
            .catch((error) => {
                this.setState({
                    film: {
                        ...this.state.film,
                        status: {
                            ...this.state.film.status,
                            error: true,
                        }
                    },
                    characters: {
                        ...this.state.characters
                    }
                })
            })
    }

    toggleFavoriteHandler = () => {
        if (!this.props.currentFavoriteMoviesTitles.includes(this.state.film.items.currentFilm.title)) {
            this.props.addToFavorites("favoriteMovies", this.props.currentFavoriteMovies, this.state.film.items.currentFilm)
            this.setState({
                film: {
                    ...this.state.film,
                    status: {
                        ...this.state.film.status,
                        isFavorite: true,
                    }
                },
                characters: {
                    ...this.state.characters
                }
            })
        }

        else {
            this.props.removeFromFavorites("favoriteMovies", this.props.currentFavoriteMovies, this.state.film.items.currentFilm.title, "title")
            this.setState({
                film: {
                    ...this.state.film,
                    status: {
                        ...this.state.film.status,
                        isFavorite: false,
                    }
                },
                characters: {
                    ...this.state.characters
                }
            })
        }
    }

    render() {
        return (
            <>
                {this.state.film.items && <Row className="p-2 m-2 text-center mx-auto">
                    <Col><h1>{this.state.film.items.currentFilm.title}</h1></Col>
                </Row>
                }
                {this.state.film.items && renderComponent(this.state.film.status.isLoading, this.state.film.status.error,
                    <><Container className="movie-details-container text-center mx-auto">
                        <div className="left-part-lg">
                            <Row>
                                <Col>
                                    <Image rounded
                                        className="movie-cover img-thumbail"
                                        src={this.state.film.items.currentFilmImg}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <div className="right-part-lg">
                            <Row className="p-3">
                                <Col><h2>About the movie</h2></Col>
                            </Row>
                            <InfoLine
                                header={"Director"}
                                data={this.state.film.items.currentFilm.director}
                            />
                            <InfoLine
                                header={"Issue Number"}
                                data={this.state.film.items.currentFilm.episode_id}
                            />
                            <hr></hr>
                            {this.state.characters.items &&
                                <CharactersList
                                    charLoading={this.state.characters.status.loading}
                                    charError={this.state.characters.status.error}
                                    characters={this.state.characters.items}
                                />
                            }
                        </div>
                    </Container>
                        <MovieDescription
                            opening_crawl={this.state.film.items.currentFilm.opening_crawl}
                        />
                        <FooterButtons
                            isFavorite={this.state.film.status.isFavorite}
                            toggleFavoriteHandler={this.toggleFavoriteHandler}
                            currentFavorites={this.props.currentFavoriteMovies}
                            toAdd={this.state.film.items.currentFilm.title}

                        />
                    </>)
                }
            </>
        )
    }
}