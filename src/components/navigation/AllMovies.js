
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { getId, render } from '../../util';


export const AllMovies = (props) => {

    return (
        <NavDropdown title="Movies" id="basic-nav-dropdown">
            {render(props.isLoading, props.isError,
                props.allMovies
                    .map(movie => <NavDropdown.Item as={Link} to={"/films/" + getId(movie.url)}>{movie.title}</NavDropdown.Item>))}
        </NavDropdown>
    )
}