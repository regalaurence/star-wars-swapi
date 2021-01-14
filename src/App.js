import React from 'react'
import './App.css'
import { MovieDetails, MovieList } from './components/movies'
import { CharactersList, CharacterDetails } from './components/characters'
import { Route } from 'react-router-dom';
import { Navigation } from './components/navigation'

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favoriteMovies: [],
      favoriteCharacters: [],
      allMovies: [],
    }
    this.addMovieToFavorites = this.addMovieToFavorites.bind(this)
    this.addCharToFavorites = this.addCharToFavorites.bind(this)

  }

  componentDidMount() {
    const favoriteMovies = this.getLocalStorage();
    if (favoriteMovies) {
      this.setState({ favoriteMovies })
    }
    else this.setState({
      favoriteMovies: []
    })
  }

  getLocalStorage() {
    const favoriteMovies = localStorage.getItem('favoriteMovies');
    const favoriteCharacters = localStorage.getItem('favoriteCharacters');
    if (favoriteMovies) {
      return favoriteMovies
    }
    if (favoriteCharacters) {
      return favoriteCharacters
    }
  }

  setLocalStorage() {
    localStorage.setItem('favoriteMovies', this.state.favoriteMovies)
    localStorage.setItem('favoritesCharacters', this.state.favoriteCharacters)

  }

  addMovieToFavorites(movie) {
    // console.log('state', this.state)
    this.setState(
      { favoriteMovies: [...this.state.favoriteMovies, movie] },
    )
  }

  addCharToFavorites(char) {
    // console.log('state', this.state)
    this.setState(
      { favoriteCharacters: [...this.state.favoriteCharacters, char] },
    )
  }

  render() {
    return (
      <>
        <Navigation favoriteMovies={this.state.favoriteMovies} favoriteCharacters={this.state.favoriteCharacters} />
        <Route exact path='/' component={MovieList} />
        <Route exact path='/films' component={MovieList} />
        <Route path='/people/:charID' component={(props) => <CharacterDetails {...props} addCharToFavorites={this.addCharToFavorites} />} />
        {/* we have to force the transfer of props because we're passing the component via a function */}
        <Route path='/films/:filmID' component={(props) => <MovieDetails {...props} addMovieToFavorites={this.addMovieToFavorites} />} />
        <Route path='/films/:filmID/characters' component={CharactersList} />
      </>
    )

  }
}

export default App;
