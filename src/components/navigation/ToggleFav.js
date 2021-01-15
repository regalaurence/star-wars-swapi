import React from 'react'
import Button from 'react-bootstrap/Button'

export const ToggleFav = (props) => { 

    // isFavorite={this.state.isFavorite} 
    // addToFavoriteHandler={this.addToFavoriteHandler} 
    // currentFavorites={this.props.currentFavorites}
    // toAdd={this.state.currentFilm.title}

    return (
        <> { props.isFavorite ? <Button onClick={props.toggleFavoriteHandler} className="m-2">Added to favorites</Button>
            :
            <Button onClick={props.toggleFavoriteHandler} variant="dark" className="m-2">Add to favorite</Button>
        }
        </>
    )
}