import React from 'react'
import axios from 'axios'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom';
import { CharFilmList, CharVehiclesList, CharStarshipsList, CharSpecies, FooterButtons } from './';
import { render } from '../../util'
import { ToggleFav } from '../navigation'

export class CharacterDetails extends React.Component {


    // props.charURL => the char onwhich the user clicked 
    state = {
        character: {},
        isCharLoading: true,
        isCharError: false,
        isFavorite: false,
        films: [],
        areFilmsLoading: true,
        areFilmsError: false,
        areThereFilms: true,
        vehicles: [],
        areVehiclesLoading: true,
        areVehiclesError: false,
        areThereVehicles: false,
        starships: [],
        areStarshipsLoading: true,
        areStarshipsError: false,
        areThereStarships: false,
        species: [],
        areSpeciesLoading: true,
        areSpeciesError: false,
        areThereSpecies: false,
        homeworld: [],
        areHomeworldLoading: true,
        areHomeworldError: false,
        areThereHomeworld: false,
    }

    componentDidMount() {
        axios.get("https://swapi.dev/api/people/" + this.props.match.params.charID)
            .then(response => {
                this.setState({
                    character: response.data,
                    isCharLoading: false
                })
                this.populateInfo("films", "areFilmsLoading", "areFilmsError", "areThereFilms", this.state.character.films)
                this.populateInfo("vehicles", "areVehiclesLoading", "areVehiclesError", "areThereVehicles", this.state.character.vehicles)
                this.populateInfo("starships", "areStarshipsLoading", "areStarshipsError", "areThereStarships", this.state.character.starships)
                this.populateInfo("species", "areSpeciesLoading", "areSpeciesError", "areThereSpecies", this.state.character.species)
                if (this.props.currentFavoriteChars.includes(this.state.character.name)) {
                    this.setState({
                        isFavorite: true
                    })
                }
            })
            .catch((error) => {
                this.setState({
                    isCharError: true
                })
            })
    }


    populateInfo = (stateToPopulate, isThisLoading, isThisError, areThereAny, arrayOfURLs) => {
        let promises = arrayOfURLs.map(url =>
            axios.get(url)
        )
        return Promise.all(promises)
            .then((response) => {
                console.log('res', response)
                const toNames = response.map(e => e.data)
                if (toNames.length > 0) {
                    this.setState({
                        [stateToPopulate]: toNames,
                        [isThisLoading]: false,
                        [areThereAny]: true,
                    })
                }
            })
            .catch((error) => {
                this.setState({
                    [isThisError]: true
                })
            })
    }

    toggleFavoriteHandler = () => {
        if (!this.props.currentFavoriteCharsNames.includes(this.state.character.name)) {
            this.props.addToFavorites("favoriteCharacters", "favoritesCharactersNames", this.props.currentFavoriteChars, this.props.currentFavoriteCharsNames, this.state.character, this.state.character.name)
            this.setState({
                isFavorite: true
            })
        }
        else {
            this.props.removeNameFromFavorites("favoritesCharactersNames", this.props.currentFavoriteCharsNames, this.state.character.name)
            this.props.removeObjFromFavoriteChar("favoriteCharacters", this.props.currentFavoriteChars, this.state.character.name)
            this.setState({
                isFavorite: false
            })
        }
    }

    render() {

        let charImgSrc = "/images/characters/" + this.props.match.params.charID + ".jpg"
        // console.log(charImgSrc)

        return (
            <>
                {this.state.character && render(this.state.isCharLoading, this.state.isCharError,
                    <>
                        <Row className="p-2 m-2 text-center mx-auto">
                            <Col><h1>{this.state.character.name}</h1></Col>
                        </Row>
                        <Container className="movie-details-container text-center mx-auto">
                            <div className="left-part-lg">
                                <Row>
                                    <Col><Image rounded className="img-thumbail" src={charImgSrc} /></Col>
                                </Row>
                            </div>
                            <div className="right-part-lg">
                                <Row className="p-3">
                                    <Col><h2>About {this.state.character.name}</h2></Col>
                                </Row>
                                <CharSpecies
                                    areThereSpecies={this.state.areThereSpecies}
                                    areSpeciesLoading={this.state.areSpeciesLoading}
                                    areSpeciesError={this.state.areSpeciesError}
                                    species={this.state.species}
                                />
                               
                                <Row className="text-left">
                                    <Col><p><strong>Gender</strong></p></Col>
                                    <Col>{this.state.character.gender}</Col>
                                </Row>
                                <Row className="text-left">
                                    <Col><p><strong>Birth Year</strong></p></Col>
                                    <Col>{this.state.character.birth_year}</Col>
                                </Row>
                                <Row className="text-left">
                                    <Col><p><strong>Eye color</strong></p></Col>
                                    <Col>{this.state.character.eye_color}</Col>
                                </Row>
                                <Row className="text-left">
                                    <Col><p><strong>Skin Color</strong></p></Col>
                                    <Col>{this.state.character.skin_color}</Col>
                                </Row>
                                <Row className="text-left">
                                    <Col><p><strong>Hair Color</strong></p></Col>
                                    <Col>{this.state.character.hair_color}</Col>
                                </Row>
                                <Row className="text-left">
                                    <Col><p><strong>Height and weight</strong></p></Col>
                                    <Col>{this.state.character.height}cm, {this.state.character.mass}kg</Col>
                                </Row>
                                <CharVehiclesList
                                    areThereVehicles={this.state.areThereVehicles}
                                    areVehiclesLoading={this.state.areVehiclesLoading}
                                    areVehiclesError={this.state.areVehiclesError}
                                    vehicles={this.state.vehicles}
                                />
                                <CharStarshipsList
                                    areThereStarships={this.state.areThereStarships}
                                    areStarshipsLoading={this.state.areStarshipsLoading}
                                    areStarshipsError={this.state.areStarshipsError}
                                    starships={this.state.starships}
                                />
                                <hr/>
                                <CharFilmList
                                    areFilmsLoading={this.state.areFilmsLoading}
                                    areFilmsError={this.state.areFilmsError}
                                    films={this.state.films}
                                />
                            </div>
                        </Container>
                        <Container className="text-center">
                            <FooterButtons
                                    isFavorite={this.state.isFavorite}
                                    toggleFavoriteHandler={this.toggleFavoriteHandler}
                                    currentFavorites={this.props.currentFavoriteChars}
                                    toAdd={this.state.character.name}
                            />
                        </Container>
                    </>
                )
                }
            </>
        )
    }
}


