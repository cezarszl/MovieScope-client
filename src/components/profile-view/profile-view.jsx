import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { FavouriteMovies } from "./favourite-movies";
import { UpdateUser } from "./update-user";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast, Bounce } from "react-toastify";

export const ProfileView = ({ user, token, movies, setUser }) => {

    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);

    const favouriteMoviesList = movies.filter((m) =>
        user.FavouriteMovies.includes(m.id)
    );

    //ReactToastify
    const updateSuccessfulToast = () => toast.success('Updated successfully!', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });

    const deleteSuccessfulToast = () => toast.info('Your account has been deleted.', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });

    const handleUpdate = (formData) => {

        const data = {
            Username: formData.username,
            Password: formData.password,
            Email: formData.email,
            Birthday: formData.birthday
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
                    updateSuccessfulToast();
                    const data = await response.json();
                    localStorage.setItem("user", JSON.stringify(data));
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000)
                } else {
                    alert("Could not update account");
                    const errorText = await response.text();
                    console.log("Error response body:", errorText);

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
                deleteSuccessfulToast();
                setTimeout(() => {
                    setUser(null);
                    localStorage.clear();
                    window.location.replace("/login");
                }, 2000)
            } else {
                alert("Could not delete account");
            }
        });
    };

    return (
        <Container className="up-container">
            <ToastContainer />
            <Row>
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
