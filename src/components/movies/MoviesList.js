import React from 'react'
import './MoviesList.css'
import axios from 'axios'
import { MovieTitle } from '.'
import Container from 'react-bootstrap/Container'


export class MovieList extends React.Component {
  state = {
    films: [],
  }

  componentDidMount() {
    axios.get("http://swapi.dev/api/films/")
      .then(response => {
        this.setState({
          films: response.data.results,
        })
        console.log(response.data.results)
      })
  }


  render() {
    return (
      <Container fluid className="movies-list-container">
        <h1>Star Wars Movies Wiki</h1>
        {this.state.films.map((film, index) =>
          <MovieTitle
            filmURL={film.url}
            title={film.title}
            key={index}
          /> 
        )}
      </Container>
    )
  }
}

