import React from 'react'
import './App.css'
import { MovieDetails, MovieList } from './components/movies'
import { CharactersList, CharacterDetails } from './components/characters'
import { Route, Switch } from 'react-router-dom';
import { Navigation } from './components/navigation'

// use the initial state to show info to users 
export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favoriteMovies: [],
      favoriteCharacters: [],
      // isLoading: true,
      // error : false
    }
    this.addMovieToFavorites = this.addMovieToFavorites.bind(this)
    this.addCharToFavorites = this.addCharToFavorites.bind(this)
    // this.removeMovieFromFavorites = this.removeMovieFromFavorites.bind(this)

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
    this.setState({ 
      favoriteMovies: [...this.state.favoriteMovies, movie] 
    })
  }

  // removeMovieFromFavorites(arrayOfFav, name) {
  //   let filteredDeletion = arrayOfFav.filter(fav => fav.title !== name)
  //   this.setState({
  //     favoriteMovies: filteredDeletion 
  //   })
  // }

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
        <Route path='/people/:charID' render={(props) => <CharacterDetails 
                                                          {...props} 
                                                          addCharToFavorites={this.addCharToFavorites} 
                                                          // removeMovieFromFavorites={this.removeMovieFromFavorites} 
                                                          currentFavorites={this.state.favoriteCharacters.map(char => char.name)}/>} />
        <Route path='/films/:filmID' render={(props) => <MovieDetails {...props} addMovieToFavorites={this.addMovieToFavorites} currentFavorites={this.state.favoriteMovies.map(movie => movie.title)}/>} />
        <Route path='/films/:filmID/characters' component={CharactersList} />
      </>
    )
  }
}

export default App;
