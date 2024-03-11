import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { UserInfo } from "./user-info";
import { FavouriteMovies } from "./favourite-movies";
import { UpdateUser } from "./update-user";
// import "./profile-view.scss"

export const ProfileView = ({ user, token, movies, setUser }) => {

    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);

    const favouriteMoviesList = movies.filter((m) =>
        user.FavouriteMovies.includes(m.id)
    );

    const handleUpdate = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
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
        <Container className="up-container">
            <Row>
                {/* <UserInfo username={user.Username} email={user.Email} /> */}
                <UpdateUser
                    handleUpdate={handleUpdate}
                    username={user.Username}
                    password={user.Password}
                    birthday={user.Birthday}
                    email={user.Email}
                    deleteAccount={deleteAccount}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    setEmail={setEmail}
                    setBirthday={setBirthday}
                />
            </Row>
            <Row>
                <FavouriteMovies
                    favouriteMoviesList={favouriteMoviesList}
                    token={token}
                    setUser={setUser}
                    user={user}
                />
            </Row >
        </Container>
    );
};
