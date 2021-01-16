import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { ToggleFav } from '../navigation'


export const FooterButtons = (props) => {

    return (
        <Container className="text-center">
            <footer>
                <Link to={"/"}><Button variant="dark" className="my-2">Back to films</Button></Link>
                <ToggleFav
                    isFavorite={props.isFavorite}
                    toggleFavoriteHandler={props.toggleFavoriteHandler}
                    currentFavorites={props.currentFavoriteChars}
                    toAdd={props.toAdd}
                />
            </footer>
        </Container>
    )
}
