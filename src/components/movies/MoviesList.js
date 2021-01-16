import React from 'react'
import './MoviesList.css'
import axios from 'axios'
import { MovieTitle } from '.'
import Container from 'react-bootstrap/Container'
import { renderComponent } from '../../util'

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
        // console.log(response.data.results)
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
        {/* let check the states and render accordingly */}
        {renderComponent(this.state.isLoading, this.state.isError,
          <div className="mx-auto carddeck">
            {this.state.films.map((film) =>
              <MovieTitle
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

