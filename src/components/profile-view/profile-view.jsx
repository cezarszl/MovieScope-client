import { useState } from "react";
import {
    Button,
    Card,
    CardGroup,
    Col,
    Container,
    Form,
    Row
} from "react-bootstrap";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProfileView = ({ user, token, movies, setUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birth_date, setBirthday] = useState("");

    const handleUpdate = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birth_date
        };

        fetch(
            `https://cezarszlmyflix-0212aa467a8d.herokuapp.com/users/${user.Username}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            }
        )
            .then(async (response) => {
                console.log("response:", response);
                if (response.ok) {
                    alert("Update successful");
                    const data = await response.json();
                    localStorage.setItem("user", JSON.stringify(data));
                    window.location.reload();
                } else {
                    const errorText = await response.text();
                    console.log("Error response body:", errorText);
                    alert("Update failed");
                }
            })
            .catch((err) => console.log("error", err));
    };

    const deleteAccount = () => {
        fetch(
            `https://cezarszlmyflix-0212aa467a8d.herokuapp.com/users/${user.Username}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ).then((response) => {
            if (response.ok) {
                setUser(null);

                localStorage.clear();
                alert("Your account has been deleted");
                window.location.replace("/login");
            } else {
                alert("Could not delete account");
            }
        });
    };

    return (
        <>
            <Container className="">
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <CardGroup>
                            <Card className="mb-5 border border-0 card-custom">
                                <Card.Body>
                                    <Card.Title>User's Profile</Card.Title>
                                    <Card.Text>Here you can edit your profile</Card.Text>
                                    <Form onSubmit={handleUpdate}>
                                        <Form.Group>
                                            <Form.Label>
                                                username:
                                                <Form.Control
                                                    type="text"
                                                    value={username}
                                                    onChange={(e) => {
                                                        setUsername(e.target.value);
                                                    }}
                                                    placeholder={user.Username}
                                                />
                                            </Form.Label>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>
                                                password:
                                                <Form.Control
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => {
                                                        setPassword(e.target.value);
                                                    }}
                                                    // required
                                                    placeholder="*******"
                                                />
                                            </Form.Label>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>
                                                email:
                                                <Form.Control
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => {
                                                        setEmail(e.target.value);
                                                    }}
                                                    // required
                                                    placeholder={user.Email}
                                                />
                                            </Form.Label>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>
                                                bday:
                                                <Form.Control
                                                    type="date"
                                                    value={birth_date}
                                                    onChange={(e) => {
                                                        setBirthday(e.target.value);
                                                    }}
                                                />
                                            </Form.Label>
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
                        </CardGroup>
                    </Col>
                </Row>
            </Container>

        </>
    );
};