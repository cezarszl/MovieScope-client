import React from 'react'
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
export const SimilarMovies = ({ similarMovies, token, setUser, user }) => {
    return (
        <>
            <h2>Similar Movies</h2>
            <Row className="justify-content-center">
                {
                    similarMovies.length !== 0 ?
                        similarMovies.map((movie) => (
                            <Col key={movie._id}>
                                <MovieCard
                                    movie={movie}
                                    token={token}
                                    setUser={setUser}
                                    user={user}
                                />
                            </Col>
                        ))
                        : <Col>
                            <p>There are no similar Movies</p>
                        </Col>
                }
            </Row>
        </>
    )
}
