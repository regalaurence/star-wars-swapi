
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { getId, renderComponent } from '../../util';


export const AllMovies = (props) => {

    return (
        <NavDropdown title="Movies" id="basic-nav-dropdown">
            {renderComponent(props.isLoading, props.isError,
                props.allMovies
                    .map(movie => <NavDropdown.Item as={Link} to={"/films/" + getId(movie.url)}>{movie.title}</NavDropdown.Item>))}
        </NavDropdown>
    )
}