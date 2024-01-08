import React from 'react'
import { Row, Col, Container } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "./similar-movies.scss"
export const SimilarMovies = ({ similarMovies, token, setUser, user }) => {
    return (
        <Container className="sm-container" >
            <h2>You may also like</h2>
            <Row className="d-flex justify-content-center">
                {
                    similarMovies.length !== 0 ?
                        similarMovies.map((movie) => (
                            <Col className="sm-col" key={movie.id}>
                                <MovieCard
                                    movie={movie}
                                    token={token}
                                    setUser={setUser}
                                    user={user}
                                />
                            </Col>
                        ))
                        : <Col>
                            <p>There are no similar movies</p>
                        </Col>
                }
            </Row>
        </Container>
    )
}
