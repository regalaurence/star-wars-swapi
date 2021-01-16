
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from "react-router-bootstrap";
import { getId, render } from '../../util';


export const AllMovies = (props) => {

    return (
        <NavDropdown title="Movies" id="basic-nav-dropdown">
            {render(props.isLoading, props.isError,
                props.allMovies
                    .map(movie => <LinkContainer to={"/films/" + getId(movie.url)}><NavDropdown.Item>{movie.title}</NavDropdown.Item></LinkContainer>))}
        </NavDropdown>
    )
}