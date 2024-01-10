import React from "react";
import { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { setUser } from "../../redux/reducers/user";
import { useDispatch } from "react-redux";
import "./login-view.scss"

const LoginView = ({ }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };
        fetch("https://cezarszlmyflix-0212aa467a8d.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    dispatch(setUser({ user: data.user, token: data.token }));
                } else {
                    alert("No such user");
                }
            })
            .catch((e) => {
                alert("Something went wrong");
            });
    }
    return (
        <Container className="loginBox">
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername" className="formBox">
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="3"
                        autoComplete="username"
                    />
                    <Form.Label>Username</Form.Label>
                </Form.Group>

                <Form.Group controlId="formPassword" className="formBox">
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="password"
                    />
                    <Form.Label>Password</Form.Label>
                </Form.Group>
                <Button id="loginBtn" type="submit">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Login
                </Button>
            </Form>
        </Container>
    );
};

export { LoginView };