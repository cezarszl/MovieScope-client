import React from 'react'
import { Button, Col, Form, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./update-user.scss"

export const UpdateUser = ({ handleUpdate, username, birthday, email, deleteAccount, setUsername, setPassword, setEmail, setBirthday }) => {
    return (
        <Col className="d-flex justify-content-center">
            <Card className="updateCard">
                <Card.Body className="updateBox">
                    <Card.Title>Update your information</Card.Title>
                    <Form onSubmit={handleUpdate}>
                        <Form.Group className="formBox">

                            <Form.Control
                                type="text"
                                autoComplete='username'
                                defaultValue={username}
                                onChange={e => setUsername(e.target.value.trim())}

                            />
                            <Form.Label>Username</Form.Label>
                        </Form.Group>
                        <Form.Group className="formBox">

                            <Form.Control
                                type="password"
                                autoComplete='current-password'
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                required
                            />
                            <Form.Label>New password</Form.Label>
                        </Form.Group>
                        <Form.Group className="formBox">

                            <Form.Control
                                type="email"
                                defaultValue={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}

                            />
                            <Form.Label>Email</Form.Label>
                        </Form.Group>
                        <Form.Group className="formBox">

                            <Form.Control
                                type="date"
                                defaultValue={birthday.slice(0, 10)}
                                onChange={(e) => {
                                    setBirthday(e.target.value);
                                }}
                            />
                            <Form.Label>Birthday</Form.Label>
                        </Form.Group>
                        <Button
                            type="submit"
                            onClick={handleUpdate}
                            id="updateBtn"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            update profile
                        </Button>
                        <Form.Group>
                            <Link className="removeLink">
                                <Button
                                    onClick={() => { if (window.confirm('Would you like to delete your account permanently?')) { deleteAccount() }; }}
                                    className="removeBtn"
                                >
                                    Remove account permanently
                                </Button>
                            </Link>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    )
}
