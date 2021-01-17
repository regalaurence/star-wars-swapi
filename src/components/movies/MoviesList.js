import React from 'react'
import './MoviesList.css'
import axios from 'axios'
import { MovieTitle } from '.'
import { renderComponent } from '../../util'
import Container from 'react-bootstrap/Container'

//show info liek laoding
export class MovieList extends React.Component {
  state = {
    films: [],
    isLoading: true,
    isError: false
  }

  componentDidMount() {
    axios.get("http://swapi.dev/api/films/")
      .then(response => {
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
        <h1 className="m-4">Pick Star Wars Movies</h1>
        {/* check the states and render accordingly */}
        {renderComponent(this.state.isLoading, this.state.isError,
          <div className="mx-auto carddeck">
            {this.state.films.map((film, index) =>
              <MovieTitle
                key={index}
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

