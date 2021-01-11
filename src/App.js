import React from 'react'
import './App.css'
import { MovieDetails, MovieList } from './components/movies'
import { CharacterDetails, CharactersList } from './components/characters'
import { Route } from 'react-router-dom';

export const App = () => (
  <>
    <Route exact path='/' component={MovieList} />
    <Route path='/people/:charID' component={CharacterDetails} />
    <Route path='/films/:filmID' component={MovieDetails} />
    <Route path='/films/:filmID/characters' component={CharactersList} />
  </>
)

export default App;
