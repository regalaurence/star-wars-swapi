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
      favoriteCharacters: [],
      hasFavoriteChars: false,
      hasFavoriteMovies: false,
    }
    this.addToFavorites = this.addToFavorites.bind(this)
    this.removeFromFavorites = this.removeFromFavorites.bind(this)
  }


  addToFavorites(stateFavtoAdd, hasFavBool, arrayOfFav, favToAdd) {
    // console.log('state', this.state)
    this.setState({ 
      [stateFavtoAdd]: [...arrayOfFav, favToAdd],
      [hasFavBool]: true 
    })
  }

  removeFromFavorites(stateToChange, arrayOfFav, favToRemove) {
    let filteredDeletion = arrayOfFav.filter(fav => fav !== favToRemove)
    this.setState({
      [stateToChange]: filteredDeletion 
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
                                                          removeFromFavorites={this.removeFromFavorites} 
                                                          currentFavoriteCharsNames={this.state.favoriteCharacters.map(char => char.name)}
                                                          currentFavoriteChars={this.state.favoriteCharacters}
                                                          />} />
        <Route path='/films/:filmID' render={(props) => <MovieDetails 
                                                        {...props} 
                                                        addToFavorites={this.addToFavorites} 
                                                        removeFromFavorites={this.removeFromFavorites} 
                                                        currentFavoriteMoviesTitles={this.state.favoriteMovies.map(movie => movie.title)}
                                                        currentFavoriteMovies={this.state.favoriteMovies}
                                                        />} />
        <Route path='/films/:filmID/characters' component={CharactersList} />
      </>
    )
  }
}

export default App;
