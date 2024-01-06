import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MoviesSearch } from "../movies-search/movies-search";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../redux/reducers/user";

export const NavigationBar = ({ }) => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    myFlix
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/">
                                    Home
                                </Nav.Link>
                                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                {<Nav.Link onClick={() => dispatch(clearUser())}>Logout</Nav.Link>}
                            </>
                        )}
                        <MoviesSearch />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};