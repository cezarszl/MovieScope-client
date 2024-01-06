import React from 'react'
import { Button, Col, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const UpdateUser = ({ handleUpdate, username, birthday, email, deleteAccount, setUsername, setPassword, setEmail, setBirthday }) => {
    return (
        <Col xs={12} sm={4}>
            <Card>
                <Card.Body>
                    <Card.Title>Update your information</Card.Title>
                    <Form onSubmit={handleUpdate}>
                        <Form.Group>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete='username'
                                defaultValue={username}
                                onChange={e => setUsername(e.target.value.trim())}
                                placeholder="Enter a username"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                autoComplete='current-password'
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                placeholder="Minimum 10 characters"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                defaultValue={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                placeholder="Enter your email address"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control
                                type="date"
                                defaultValue={birthday}
                                onChange={(e) => {
                                    setBirthday(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={handleUpdate}
                            className="text-white mt-4"
                        >
                            update profile
                        </Button>
                    </Form>
                    <Link to="/login">
                        <Button
                            variant="danger"
                            type=""
                            onClick={deleteAccount}
                            className="text-white mt-3"
                        >
                            delete your account
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        </Col>
    )
}
