import React from 'react'
import './App.css'
import { Route } from 'react-router-dom';
import { NavigationBar } from './components/navigation'
import { MovieDetails, MovieList } from './components/movies'
import { CharacterDetails } from './components/characters'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favoriteMovies: [],
      favoriteCharacters: [],
    }
    this.addToFavorites = this.addToFavorites.bind(this)
    this.removeFromFavorites = this.removeFromFavorites.bind(this)
    this.removeFromFavorites = this.removeFromFavorites.bind(this)
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
        [itemToGet]: JSON.parse(localStorage.getItem(itemToGet))
      })
    }
    else {
      this.setState({
        [itemToGet]: []
      })
    }
  }

  setLocalStorage() {
    localStorage.setItem('favoriteMovies', JSON.stringify(this.state.favoriteMovies))
    localStorage.setItem('favoriteCharacters', JSON.stringify(this.state.favoriteCharacters))
  }

  addToFavorites(key, arrayOfFavObj, favObjToAdd) {
    this.setState({
      [key]: [...arrayOfFavObj, favObjToAdd],
    })
  }

  removeFromFavorites(key, arrayOfFavObj, favObjToRemoveName, keyToFilter) {
    let filteredDeletionObj = arrayOfFavObj.filter(fav => fav[keyToFilter] !== favObjToRemoveName)

    this.setState({
      [key]: filteredDeletionObj,
    })
  }

  render() {
    return (
      <>
        <NavigationBar
          favoriteMovies={this.state.favoriteMovies}
          favoriteCharacters={this.state.favoriteCharacters}
        />
        <Route getByTestId="homeroute" exact path='/' component={MovieList} />
        <Route exact path='/films' component={MovieList} />
        <Route path='/people/:charID' render={(props) =>
          <CharacterDetails
            {...props}
            addToFavorites={this.addToFavorites}
            removeFromFavorites={this.removeFromFavorites}
            currentFavoriteCharsNames={this.state.favoriteCharacters.map(c => c.name)}
            currentFavoriteChars={this.state.favoriteCharacters}
          />}
        />
        <Route path='/films/:filmID' render={(props) =>
          <MovieDetails
            {...props}
            addToFavorites={this.addToFavorites}
            removeFromFavorites={this.removeFromFavorites}
            currentFavoriteMoviesTitles={this.state.favoriteMovies.map(m => m.title)}
            currentFavoriteMovies={this.state.favoriteMovies}
          />}
        />
      </>
    )
  }
}

export default App;
