import React from 'react'
import './App.css'
import { MovieDetails, MovieList } from './components/movies'
import { CharactersList, CharacterDetails } from './components/characters'
import { Route } from 'react-router-dom';
import { NavigationBar } from './components/navigation'

// use the initial state to show info to users 
export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favoriteMovies: [],
      favoriteMoviesTitles: [],
      favoriteCharacters: [],
      favoritesCharactersNames: [],
      hasFavoriteChars: false,
      hasFavoriteMovies: false,
    }
    this.addToFavorites = this.addToFavorites.bind(this)
    this.removeNameFromFavorites = this.removeNameFromFavorites.bind(this)
    this.removeObjFromFavoriteMovies = this.removeObjFromFavoriteMovies.bind(this)
    this.removeObjFromFavoriteChar = this.removeObjFromFavoriteChar.bind(this)

  }


  addToFavorites(stateKeyFavoritesObj, stateKeyFavoriteNames, arrayOfFavObj, arrayOfFavNames, favObjToAdd, nameToAdd) {
    // console.log('state', this.state)
    this.setState({ 
      [stateKeyFavoritesObj]: [...arrayOfFavObj, favObjToAdd],
      [stateKeyFavoriteNames] : [...arrayOfFavNames, nameToAdd],
    })
  }

  removeNameFromFavorites(stateKeyFavoritesName, arrayOfFavNames, favNameToRemove) {
    let filteredDeletionNames = arrayOfFavNames.filter(fav => fav !== favNameToRemove)

    this.setState({
      [stateKeyFavoritesName]: filteredDeletionNames,
    })
  }

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
                                                          currentFavoriteCharsNames={this.state.favoritesCharactersNames}
                                                          currentFavoriteChars={this.state.favoriteCharacters}
                                                          />} />
        <Route path='/films/:filmID' render={(props) => <MovieDetails 
                                                        {...props} 
                                                        addToFavorites={this.addToFavorites} 
                                                        removeNameFromFavorites={this.removeNameFromFavorites} 
                                                        removeObjFromFavoriteMovies={this.removeObjFromFavoriteMovies} 
                                                        currentFavoriteMoviesTitles={this.state.favoriteMoviesTitles}
                                                        currentFavoriteMovies={this.state.favoriteMovies}
                                                        />} />
        <Route path='/films/:filmID/characters' component={CharactersList} />
      </>
    )
  }
}

export default App;
