import React from 'react'
import './App.css'
import { MovieDetails, MovieList } from './components/movies'
import { CharactersList, CharacterDetails } from './components/characters'
import { Route } from 'react-router-dom';
import { NavigationBar } from './components/navigation'

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favoriteMovies: [],
      favoriteCharacters: [],
    }
    this.addToFavorites = this.addToFavorites.bind(this)
    this.removeObjFromFavoriteMovies = this.removeObjFromFavoriteMovies.bind(this)
    this.removeObjFromFavoriteChar = this.removeObjFromFavoriteChar.bind(this)
    this.setLocalStorage = this.setLocalStorage.bind(this);
    // persist favorites 
    window.onbeforeunload = this.setLocalStorage
  }

  componentDidMount() {
    this.checkLocalStorageAndSetStates('favoriteMovies')
    this.checkLocalStorageAndSetStates('favoriteCharacters')
  }

  checkLocalStorageAndSetStates(itemToGet) {
    if (localStorage.getItem(itemToGet)) {
      this.setState({
        [itemToGet] : JSON.parse(localStorage.getItem(itemToGet))
      })
    }
    else {
      this.setState({
        [itemToGet] : []
      })
    }
  }

  setLocalStorage() {
    localStorage.setItem('favoriteMovies', JSON.stringify(this.state.favoriteMovies))
    localStorage.setItem('favoriteCharacters', JSON.stringify(this.state.favoriteCharacters))
  }

  addToFavorites(stateKeyFavoritesObj, arrayOfFavObj, favObjToAdd) {
    this.setState({
      [stateKeyFavoritesObj]: [...arrayOfFavObj, favObjToAdd],
    })
  }

  //left it so to see there is only one parameter to change but how?  if remains so, got to clear off the params
  removeObjFromFavoriteMovies(stateKeyFavoritesObj, arrayOfFavObj, favObjNameToRemove) {
    let filteredDeletionObj = arrayOfFavObj.filter(fav => fav.title !== favObjNameToRemove)

    this.setState({
      [stateKeyFavoritesObj]: filteredDeletionObj,
    })
  }

  removeObjFromFavoriteChar(stateKeyFavoritesObj, arrayOfFavObj, favObjNameToRemove) {
    let filteredDeletionObj = arrayOfFavObj.filter(fav => fav.name !== favObjNameToRemove)

    this.setState({
      [stateKeyFavoritesObj]: filteredDeletionObj,
    })
  }

  render() {
    return (
      <>
        <NavigationBar favoriteMovies={this.state.favoriteMovies}
          favoriteCharacters={this.state.favoriteCharacters}
          hasFavoriteChars={this.state.hasFavoriteChars}
          hasFavoriteMovies={this.state.hasFavoriteMovies}
        />
        <Route exact path='/' component={MovieList} />
        <Route exact path='/films' component={MovieList} />
        <Route path='/people/:charID' render={(props) => <CharacterDetails
          {...props}
          addToFavorites={this.addToFavorites}
          removeNameFromFavorites={this.removeNameFromFavorites}
          removeObjFromFavoriteChar={this.removeObjFromFavoriteChar}
          currentFavoriteCharsNames={this.state.favoriteCharacters.map(c => c.name)}
          currentFavoriteChars={this.state.favoriteCharacters}
        />} />
        <Route path='/films/:filmID' render={(props) => <MovieDetails
          {...props}
          addToFavorites={this.addToFavorites}
          removeNameFromFavorites={this.removeNameFromFavorites}
          removeObjFromFavoriteMovies={this.removeObjFromFavoriteMovies}
          currentFavoriteMoviesTitles={this.state.favoriteMovies.map(f => f.title)}
          currentFavoriteMovies={this.state.favoriteMovies}
        />} />
        <Route path='/films/:filmID/characters' component={CharactersList} />
      </>
    )
  }
}

export default App;
