import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { MoviesSearch } from "../movies-search/movies-search";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../redux/reducers/user";
import Clapper from "./clapper.svg"
export const NavigationBar = ({ }) => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const isMainView = location.pathname === '/';
    return (
        <Navbar bg="light" expand="lg">
            <Container id="nav">

                <Navbar.Brand as={Link} to="/">
                    myFlix
                </Navbar.Brand>
                <img src={Clapper} alt="Clapper" />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-between" id="basic-navbar-nav">
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
                                <Nav.Link onClick={() => dispatch(clearUser())}>Logout</Nav.Link>
                            </>
                        )}

                    </Nav>
                    <Nav>{isMainView && <MoviesSearch />}</Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};