import React from 'react'
import Button from 'react-bootstrap/Button'

export const ToggleFav = (props) => {

    // isFavorite={this.state.isFavorite} 
    // addToFavoriteHandler={this.addToFavoriteHandler} 
    // currentFavoriteChars={this.props.currentFavoriteChars}
    // toAdd={this.state.currentFilm.title}

    return (
        <> { props.isFavorite ?
            <Button data-testid="button" onClick={props.toggleFavoriteHandler}
                variant="danger"
                className="m-2">
                Remove from favorites
            </Button>
            :
            <Button
                onClick={props.toggleFavoriteHandler}
                variant="dark"
                className="m-2">
                Add to favorite
            </Button>
        }
        </>
    )
}