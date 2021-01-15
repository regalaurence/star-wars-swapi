import React from 'react'
import axios from 'axios'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom';
import { CharFilmList } from './';
import { render } from '../../util'
import { ToggleFav } from '../navigation'

export class CharacterDetails extends React.Component {


    // props.charURL => the char onwhich the user clicked 
    state = {
        character: {},
        isFavorite: false,
        films: [],
        isCharLoading: true,
        areFilmsLoading: true,
        isCharError: false,
        areFilmsError: false
    }

    componentDidMount() {
        axios.get("https://swapi.dev/api/people/" + this.props.match.params.charID)
            .then(response => {
                this.setState({
                    character: response.data,
                    isCharLoading: false
                })
                this.populateFilms(this.state.character.films)
            })
            .catch((error) => {
                this.setState({
                    isCharError: true
                })
            })
    }

    populateFilms = (arrayOfFilmsURL) => {
        let filmPromises = arrayOfFilmsURL.map(filmURL =>
            axios.get(filmURL)
        )

        return Promise.all(filmPromises)
            .then((response) => {
                console.log('res', response)
                const films = response.map(film => film.data)
                this.setState({
                    films: films,
                    areFilmsLoading: false
                })
            })
            .catch((error) => {
                this.setState({
                    areFilmsError: true
                })
            })
    }

    addToFavoriteHandler = () => {
        this.props.addCharToFavorites(this.state.character)
        this.setState ({
            isFavorite: true
        })
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
                                <hr></hr>
                                <Row className="text-left">
                                    <Col><p><strong>Movies</strong></p></Col>
                                    <Col> {/* lets check the loading status and render accordingly */}
                                        {render(this.state.areFilmsLoading, this.state.areFilmsError, 
                                        this.state.films.map(film => <CharFilmList title={film.title} filmURL={film.url} />)
                                        )}  
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                        <Container className="text-center">
                            <footer>
                                <Link to={"/"}><Button variant="dark" className="my-2">Back to films</Button></Link>
                                <ToggleFav isFavorite={this.state.isFavorite} addToFavoriteHandler={this.addToFavoriteHandler}></ToggleFav>
                            </footer>
                        </Container>
                    </>
                )
                }
            </>
        )
    }
}


