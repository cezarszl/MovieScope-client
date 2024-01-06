import React from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { ProfileView } from "../profile-view/profile-view.jsx";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";



export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const movies = useSelector((state) => state.movies.list);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const filter = useSelector((state) =>
    state.movies.filter).trim().toLowerCase();
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      return;
    }


    fetch("https://cezarszlmyflix-0212aa467a8d.herokuapp.com/movies", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => response.json())
      .then((data) => {
        const movieFromApi = data.map((key) => {
          return {
            id: key._id,
            title: key.Title,
            image: key.ImagePath,
            director: key.Director.Name,
            genre: key.Genre.Name
          };
        });
        dispatch(setMovies(movieFromApi));
      })

  }, [token]);


  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty</Col>
                ) : (
                  <Col md={8}>
                    <MovieView user={user}
                      token={token}
                      // movies={movies}
                      setUser={setUser} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty</Col>
                ) : (
                  <>
                    {filteredMovies.map((movie) => (
                      <Col md={6} lg={4} xl={3} className="mb-5 col-8" key={movie.id}>
                        <MovieCard
                          movie={movie}
                          token={token}
                          setUser={setUser}
                          user={user}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <ProfileView
                      user={user}
                      token={token}
                      movies={movies}
                      setUser={setUser}
                    />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};