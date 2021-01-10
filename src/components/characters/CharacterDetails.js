import React from 'react'
import axios from 'axios'

export class CharacterDetails extends React.Component {


    // props.charURL => the char onwhich the user clicked 
    state = {
        character: {},
    }

    componentDidMount() {
        axios.get("https://swapi.dev/api/people/" + this.props.match.params.charID)
            .then(response => {
                this.setState({
                    character: response.data,
                })
                console.log(response.data)
            })
    }

    // films: (6) ["http://swapi.dev/api/films/1/", "http://swapi.dev/api/films/2/", "http://swapi.dev/api/films/3/", "http://swapi.dev/api/films/4/", "http://swapi.dev/api/films/5/", "http://swapi.dev/api/films/6/"]
    // gender: "n/a"
    // hair_color: "n/a"
    // height: "96"
    // homeworld: "http://swapi.dev/api/planets/8/"
    // mass: "32"
    // species: Array(1)
    // 0: "http://swapi.dev/api/species/2/"
    // starships: Array(0)
    // length: 0
    // vehicles: []
    // __proto__: Object


    render() {

        console.log(this.props.match.params.charID)
        return (
            <table>
                <thead><tr><th>{this.state.character.name}</th></tr></thead>
                {/* {this.state.character.name} is a {this.state.character.gender} character
                born in {this.state.character.birth_year}. {this.state.character.name} has {this.state.character.eye_color} eyes and a {this.state.character.skin_color} skin color.  */}
                <tboby>
                    <tr><td>Gender</td><td>{this.state.character.gender}</td></tr>
                    <tr><td>Birth year</td><td>{this.state.character.birth_year}</td></tr>
                    <tr><td>Eye color</td><td>{this.state.character.eye_color}</td></tr>
                    <tr><td>Skin color</td><td>{this.state.character.skin_color}</td></tr>
                </tboby>
            </table>)
    }
}
