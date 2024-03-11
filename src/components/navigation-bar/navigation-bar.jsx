import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { MoviesSearch } from "../movies-search/movies-search";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearUser } from "../../redux/reducers/user";
import "./navigation-bar.scss";
import Clapper from "../../assets/moviescope.png"
export const NavigationBar = ({ }) => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const isMainView = location.pathname === '/';


    const listItems = document.querySelectorAll(".nav-link");

    listItems.forEach(function (item) {
        const spanElement = item.querySelector(".hover");

        item.addEventListener("mouseover", function () {
            spanElement.style.transition = "width 0.4s, opacity 0.4s";
            spanElement.style.width = "100%";
            spanElement.style.opacity = "1";
        });

        item.addEventListener("mouseout", function () {
            spanElement.style.transition = "width 0.4s, opacity 0.4s";
            spanElement.style.width = "0%";
            spanElement.style.opacity = "0";
        });
    });

    return (

        <Navbar expand="lg">
            <Navbar.Brand as={Link} to="/">
                <img className="logo d-none d-lg-block d-xl-block" src={Clapper} alt="Clapper" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-around">
                <Nav>
                    {!user && (
                        <>
                            <Nav.Link as={Link} to="/login">Login<span className="hover"></span></Nav.Link>
                            <Nav.Link as={Link} to="/signup">Signup<span className="hover"></span></Nav.Link>
                        </>
                    )}
                    {user && (
                        <>
                            <Nav.Link as={Link} to="/">Home<span className="hover"></span></Nav.Link>
                            <Nav.Link as={Link} to="/profile">Profile<span className="hover"></span></Nav.Link>
                            <Nav.Link onClick={() => dispatch(clearUser())}>Logout<span className="hover"></span></Nav.Link>
                        </>
                    )}
                </Nav>

                <Nav>{isMainView && <MoviesSearch />}</Nav>
            </Navbar.Collapse>
        </Navbar >
    );
};