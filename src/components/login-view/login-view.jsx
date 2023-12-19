import React from "react";
import { useState } from "react";
const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }
            })
            .catch((e) => {
                alert("Something went wrong");
            });
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username: <input type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} required minLength={6} />
            </label>
            <label >
                Password: <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export { LoginView };