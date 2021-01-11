import React from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom';
import { CharFilmList } from './';
import { render } from '../../util'
import { getId } from '../../util';

export class CharacterDetails extends React.Component {


    // props.charURL => the char onwhich the user clicked 
    state = {
        character: {},
        characterID: '',
        films: null,
        status: 'initial'
    }

    componentDidMount() {
        axios.get("https://swapi.dev/api/people/" + this.props.match.params.charID)
            .then(response => {
                this.setState({
                    character: response.data,
                })
                this.populateFilms(this.state.character.films)
            })
    }

    populateFilms = (arrayOfFilmsURL) => {
        console.log(arrayOfFilmsURL)
        let filmPromises = arrayOfFilmsURL.map(filmURL =>
            axios.get(filmURL)
        )

        return Promise.all(filmPromises)
            .then((response) => {
                console.log('res', response)
                const films = response.map(film => film.data)
                this.setState({
                    films: films,
                    status: 'final'
                })
            }).catch((error) => {
                this.setState({ status: 'error' })
            })
    }


    render() {

        let charImgSrc = "/images/characters/" + this.props.match.params.charID + ".jpg"
        console.log(charImgSrc)

        return (

            <Card fluid className="text-center mx-auto">
                <Card.Header><h2>{this.state.character.name}</h2></Card.Header>
                <Card.Img variant="top" className="movie-cover" src={charImgSrc} />
                <Card.Body>
                    <ListGroup>
                        <ListGroupItem><Row className="table-lign">
                            <Col>Gender</Col>
                            <Col>{this.state.character.gender}</Col></Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row className="table-lign">
                                <Col>Birth year</Col>
                                <Col>{this.state.character.birth_year}</Col></Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row className="table-lign">
                                <Col>Eye color</Col>
                                <Col>{this.state.character.eye_color}</Col></Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row className="table-lign">
                                <Col>Skin color</Col>
                                <Col>{this.state.character.skin_color}</Col></Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row className="table-lign">
                                <Col>Hair color</Col>
                                <Col>{this.state.character.hair_color}</Col></Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row className="table-lign">
                                <Col>Height in cm</Col>
                                <Col>{this.state.character.height}</Col></Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row className="table-lign">
                                <Col>Mass in kg</Col>
                                <Col>{this.state.character.mass}</Col></Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row className="table-lign">
                                <Col>Films</Col>
                                <Col>
                                    {this.state.films ?
                                        render(this.state.status, this.state.films
                                            .map(film => <CharFilmList title={film.title} filmURL={film.url} />)) : null}
                                </Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                </Card.Body>
                <Card.Footer>
                    <div className="footer-btns">
                        <div><Button variant="outline-secondary">Add To Favorites</Button></div>
                        <div><Link to={"/films/" + this.props.match.params.filmID}><Button variant="dark" className="my-2">Back to film info</Button></Link></div>
                    </div>
                </Card.Footer>
            </Card>
        )
    }
}
