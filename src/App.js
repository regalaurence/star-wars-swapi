import React from 'react'
import './App.css'
import { MovieDetails, MovieList } from './components/movies'
import { CharacterDetails } from './components/characters'
import { Route } from 'react-router-dom';

export const App = () => (
  <>
    <Route exact path='/' component={MovieList} />
    <Route path='/people/:charID' component={CharacterDetails} />
    <Route path='/films/:filmID' component={MovieDetails} />
  </>
)

export default App;
