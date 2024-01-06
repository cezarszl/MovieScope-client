import React from 'react'
import { Card, Col } from "react-bootstrap";

export const UserInfo = ({ username, email }) => {
    return (
        <Col xs={12} sm={4}>
            <Card>
                <Card.Body>
                    <Card.Title>Account information</Card.Title>
                    <Card.Text>User: {username}</Card.Text>
                    <Card.Text>Email: {email}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}
