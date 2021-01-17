import React from 'react'
import './MoviesList.css'
import axios from 'axios'
import { MovieCard } from '.'
import { getId, renderComponent } from '../../util'
import Container from 'react-bootstrap/Container'

//show info liek laoding
export class MovieList extends React.Component {
  state = {
    films: [],
    isLoading: true,
    isError: false
  }

  componentDidMount() {
    axios.get("https://swapi.dev/api/films/")
      .then(response => {
        console.log(response)
        this.setState({
          films: response.data.results,
          isLoading: false
        })
      })
      .catch((error) => {
        this.setState({
          isError: true
        })
      })
  }

  render() {

    return (
      <Container fluid className="text-center">
        <h1 className="m-4">Pick a Star Wars Movie</h1>
        {/* check the states and render accordingly */}
        {renderComponent(this.state.isLoading, this.state.isError,
          <div className="mx-auto carddeck">
            {this.state.films.map(film =>
              <MovieCard
                test-id={"film-card-" + getId(film.url)}
                key={getId(film.url)}
                filmURL={film.url}
                title={film.title}
              />
            )}
          </div>)
        }
      </Container>
    )
  }
}

