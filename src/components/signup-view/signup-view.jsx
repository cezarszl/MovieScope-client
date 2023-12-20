import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birth_date, setBirth_Date] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {

            Username: username,
            Password: password,
            Email: email,
            Birthday: birth_date
        }
        fetch("https://cezarszlmyflix-0212aa467a8d.herokuapp.com/users",
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                if (response.ok) {
                    alert("Signup successful");
                    window.location.reload();
                } else {
                    alert("Signup failed")
                }
            })
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="signUpFormUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                />
            </Form.Group>

            <Form.Group controlId="signUpFormPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="signUpFormEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="signUpFormBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                    type="date"
                    value={birth_date}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};
export { SignupView };