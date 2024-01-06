import React from 'react'
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export const MovieInfo = ({ movie }) => {
    return (
        <>
            <Row>
                <Col>
                    <img className="w-50" src={movie.image} />
                </Col>
            </Row>
            <Row>
                <span>Title: </span>
                <span>{movie.title}</span>
            </Row>
            <Row>
                <span>Director: </span>
                <span>{movie.director}</span>
            </Row>
            <Row>
                <Link to={`/`}>
                    <Button className="back-button">Back</Button>
                </Link>
            </Row>
        </>
    )
}
