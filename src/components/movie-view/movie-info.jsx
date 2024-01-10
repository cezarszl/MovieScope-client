import React from 'react'
import { Row, Col, Button, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FavouriteToggle } from "../favourite-toogle/favourite-toggle";
import "./movie-info.scss";
import { StarRating } from "../star-rating/star-rating";

export const MovieInfo = ({ movie }) => {

    return (
        <Container className="mi-container">
            <Row className='justify-content-center'>
                <Col>
                    <Card className="mi-imgcard">
                        <Card.Img className="mi-img" src={movie.image} />
                    </Card>
                </Col>

                <Col>
                    <Card className="mi-infocard">
                        <Card.Body className="d-flex flex-column">
                            <Card.Title className="fs-2">{movie.title}</Card.Title>
                            <Card.Text className='description'>{movie.description}</Card.Text>

                            <Card.Text><span>Genre:</span>{movie.genre}</Card.Text>
                            <Card.Text><span>Director:</span> {movie.director}</Card.Text>
                            <Card.Text><span>Release Date:</span> {movie.release_date.slice(0, 10).replace(/-/g, '/')}</Card.Text>
                            <Card.Text><span>Rating:</span><StarRating rating={movie.rating} /></Card.Text>
                        </Card.Body>
                        <Col className="btns-col d-flex justify-content-between">
                            <Link to="/">
                                <Button className="backBtn">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    Go back
                                </Button>
                            </Link>
                            <FavouriteToggle movie={movie} />
                        </Col>

                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
