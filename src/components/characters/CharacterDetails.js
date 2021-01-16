import React from 'react'
import axios from 'axios'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { CharFilmList, CharVehiclesList, CharStarshipsList, CharSpecies, FooterButtons } from './';
import { renderComponent, populateInfo } from '../../util'

export class CharacterDetails extends React.Component {

    state = {
        character: {
            item: {},
            status: {
                error: false,
                isNotEmpty: false,
                loading: true,
                isFavorite: false
            }
        },
        films: {
            items: [],
            status: {
                error: false,
                isNotEmpty: false,
                loading: true
            }
        },
        vehicles: {
            items: [],
            status: {
                error: false,
                isNotEmpty: false,
                loading: true
            }
        },
        starships: {
            items: [],
            status: {
                error: false,
                isNotEmpty: false,
                loading: true
            }
        },
        species: {
            items: [],
            status: {
                error: false,
                isNotEmpty: false,
                loading: true
            }
        },
        homeworld: {
            items: [],
            status: {
                error: false,
                isNotEmpty: false,
                loading: true
            }
        },
    }

    componentDidMount() {
        axios.get("https://swapi.dev/api/people/" + this.props.match.params.charID)
            .then(response => {
                const isFavorite = !!this.props.currentFavoriteChars.some(item => response.data.name === item.name)
                this.setState({
                    character: {
                        item: response.data,
                        status: {
                            loading: false,
                            isNotEmpty: true,
                            isFavorite
                        }
                    },
                })
                return populateInfo("films", this.state.character.item.films, this)
                .then(() => {
                    return populateInfo("vehicles", this.state.character.item.vehicles, this)
                })
                .then(() => {
                    return populateInfo("starships", this.state.character.item.starships, this)
                })
                .then(() => {
                    return populateInfo("species", this.state.character.item.species, this)
                })
        
            })
            .catch((error) => {
                this.setState({
                    character: {
                        status: {
                            error: true,
                        }
                    },
                })
            })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.charID !== this.props.match.params.charID) {
            this.componentDidMount()
        }
    }

    toggleFavoriteHandler = () => {
        if (!this.props.currentFavoriteCharsNames.includes(this.state.character.item.name)) {
            this.props.addToFavorites("favoriteCharacters", this.props.currentFavoriteChars, this.state.character.item)
            this.setState({
                character: {
                    ...this.state.character,
                    status: {
                        ...this.state.character.status,
                        isFavorite: true,
                       
                        
                    }
                },
            })
        }
        else {
            this.props.removeFromFavorites("favoriteCharacters", this.props.currentFavoriteChars, this.state.character.item.name, "name")
            this.setState({
                character: {
                    ...this.state.character,
                    status: {
                        ...this.state.character.status,
                        isFavorite: false,
                    }
                },
            })
        }
    }

    render() {

        let charImgSrc = "/images/characters/" + this.props.match.params.charID + ".jpg"

        return (
            <>
                {this.state.character.item && 
                renderComponent(this.state.character.status.loading, this.state.character.status.error,
                    <>
                        <Row className="p-2 m-2 text-center mx-auto">
                            <Col><h1>{this.state.character.item.name}</h1></Col>
                        </Row>
                        <Container className="movie-details-container text-center mx-auto">
                            <div className="left-part-lg">
                                <Row>
                                    <Col><Image rounded className="img-thumbail" src={charImgSrc} /></Col>
                                </Row>
                            </div>
                            <div className="right-part-lg">
                                <Row className="p-3">
                                    <Col><h2>About {this.state.character.item.name}</h2></Col>
                                </Row>
                                {this.state.species.status.isNotEmpty && 
                                    <CharSpecies
                                        areThereSpecies={this.state.species.status.isNotEmpty}
                                        areSpeciesLoading={this.state.species.status.loading}
                                        areSpeciesError={this.state.species.status.error}
                                        species={this.state.species.items}
                                    />
                                }
                                <Row className="text-left">
                                    <Col><p><strong>Gender</strong></p></Col>
                                    <Col>{this.state.character.item.gender}</Col>
                                </Row>
                                <Row className="text-left">
                                    <Col><p><strong>Birth Year</strong></p></Col>
                                    <Col>{this.state.character.item.birth_year}</Col>
                                </Row>
                                <Row className="text-left">
                                    <Col><p><strong>Eye color</strong></p></Col>
                                    <Col>{this.state.character.item.eye_color}</Col>
                                </Row>
                                <Row className="text-left">
                                    <Col><p><strong>Skin Color</strong></p></Col>
                                    <Col>{this.state.character.item.skin_color}</Col>
                                </Row>
                                <Row className="text-left">
                                    <Col><p><strong>Hair Color</strong></p></Col>
                                    <Col>{this.state.character.item.hair_color}</Col>
                                </Row>
                                <Row className="text-left">
                                    <Col><p><strong>Height in cm</strong></p></Col>
                                    <Col>{this.state.character.item.height}</Col>
                                </Row>
                                <Row className="text-left">
                                    <Col><p><strong>Weight in kg</strong></p></Col>
                                    <Col>{this.state.character.item.mass}</Col>
                                </Row>
                                {this.state.vehicles.status.isNotEmpty &&
                                    <CharVehiclesList
                                        areThereVehicles={this.state.vehicles.status.isNotEmpty}
                                        areVehiclesLoading={this.state.vehicles.status.loading}
                                        areVehiclesError={this.state.vehicles.status.error}
                                        vehicles={this.state.vehicles.items}
                                    />
                                }
                                {this.state.starships.status.isNotEmpty &&
                                    <CharStarshipsList
                                        areThereStarships={this.state.starships.status.isNotEmpty}
                                        areStarshipsLoading={this.state.starships.status.loading}
                                        areStarshipsError={this.state.starships.status.error}
                                        starships={this.state.starships.items}
                                    />
                                }
                                <hr />
                                {this.state.films.status.isNotEmpty &&
                                    <CharFilmList
                                        areFilmsLoading={this.state.films.status.loading}
                                        areFilmsError={this.state.films.status.error}
                                        films={this.state.films.items}
                                    />
                                }
                            </div>
                        </Container>
                        <Container className="text-center">
                            {this.state.character.item &&
                                <FooterButtons
                                isFavorite={this.state.character.status.isFavorite}
                                toggleFavoriteHandler={this.toggleFavoriteHandler}
                                currentFavorites={this.props.currentFavoriteChars}
                                toAdd={this.state.character.item.name}
                            />
                            }
                        </Container>
                    </>
                )
                }
            </>
        )
    }
}


