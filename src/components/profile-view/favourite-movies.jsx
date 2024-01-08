import React from 'react'
import { MovieCard } from "../movie-card/movie-card";
import { Row, Col, Container } from "react-bootstrap";
import "./favourite-movies.scss"
export const FavouriteMovies = ({ favouriteMoviesList, token, setUser, user }) => {
    return (
        <Container className="fm-container" >
            <h2>Your favourite movies</h2>
            <Row className="d-flex justify-content-center">
                {favouriteMoviesList.map((movie) => {
                    return (
                        <Col className="fm-col" key={movie.id}>
                            <MovieCard
                                movie={movie}
                                token={token}
                                setUser={setUser}
                                user={user}
                            />
                        </Col>

                    );
                })}
            </Row>
        </Container>
    )
}


