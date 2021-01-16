import React from 'react'
import './App.css'
import { MovieDetails, MovieList } from './components/movies'
import { CharactersList, CharacterDetails } from './components/characters'
import { Route } from 'react-router-dom';
import { Navigation } from './components/navigation'

// use the initial state to show info to users 
export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favoriteMovies: [],
      favoriteCharacters: [],
      hasFavoriteChars: false,
      hasFavoriteMovies: false,
    }
    this.addMovieToFavorites = this.addMovieToFavorites.bind(this)
    this.addCharToFavorites = this.addCharToFavorites.bind(this)
    this.removeCharFromFavorites = this.removeCharFromFavorites.bind(this)
    this.removeMovieFromFavorites = this.removeMovieFromFavorites.bind(this)

  }

  addCharToFavorites(char) {
    // console.log('state', this.state)
    this.setState(
      { 
        favoriteCharacters: [...this.state.favoriteCharacters, char],
        hasFavoriteChars: true
      }
    )
  }

  addMovieToFavorites(movie) {
    // console.log('state', this.state)
    this.setState({ 
      favoriteMovies: [...this.state.favoriteMovies, movie],
      hasFavoriteMovies: true 
    })
  }

  removeCharFromFavorites(arrayOfFav, name) {
    let filteredDeletion = arrayOfFav.filter(fav => fav !== name)
    this.setState({
      favoriteCharacters: filteredDeletion 
    })
  }

  removeMovieFromFavorites(arrayOfFav, title) {
    let filteredDeletion = arrayOfFav.filter(fav => fav !== title)
    this.setState({
      favoriteMovies: filteredDeletion 
    })
  }

  render() {
    return (
      <>
        <Navigation favoriteMovies={this.state.favoriteMovies} 
                    favoriteCharacters={this.state.favoriteCharacters} 
                    hasFavoriteChars={this.state.hasFavoriteChars}
                    hasFavoriteMovies={this.state.hasFavoriteMovies}
                    />
        <Route exact path='/' component={MovieList} />
        <Route exact path='/films' component={MovieList} />
        <Route path='/people/:charID' render={(props) => <CharacterDetails 
                                                          {...props} 
                                                          addCharToFavorites={this.addCharToFavorites} 
                                                          removeCharFromFavorites={this.removeCharFromFavorites} 
                                                          currentFavoriteChars={this.state.favoriteCharacters.map(char => char.name)}
                                                          
                                                          />} />
        <Route path='/films/:filmID' render={(props) => <MovieDetails 
                                                        {...props} 
                                                        addMovieToFavorites={this.addMovieToFavorites} 
                                                        removeMovieFromFavorites={this.removeMovieFromFavorites} 
                                                        currentFavoriteMovies={this.state.favoriteMovies.map(movie => movie.title)}/>} />
        <Route path='/films/:filmID/characters' component={CharactersList} />
      </>
    )
  }
}

export default App;
