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
      <Container fluid className="text-center">
        <h1 className="m-4">Pick Star Wars Movies</h1>
        <div className="mx-auto carddeck">{this.state.films.map((film) =>
          <MovieTitle
            filmURL={film.url}
            title={film.title}
          /> 
        )}
        </div>
      </Container>
    )
  }
}

