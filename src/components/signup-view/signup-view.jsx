import { useState } from "react";
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
        <form onSubmit={handleSubmit}>
            <label htmlFor="">Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label htmlFor="">Password:
                <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            </label>
            <label htmlFor="">Email:
                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </label>
            <label htmlFor="">DoB:
                <input type="date" value={birth_date} onChange={(e) => { setBirth_Date(e.target.value) }} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};
export { SignupView };