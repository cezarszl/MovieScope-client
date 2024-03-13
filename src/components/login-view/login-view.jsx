import React from "react";
import { Button, Form, Container } from "react-bootstrap";
import { setUser } from "../../redux/reducers/user";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast, Bounce } from "react-toastify";
import axios from "axios";
import "./login-view.scss"

const LoginView = ({ }) => {
    const dispatch = useDispatch();

    //Zod form schema
    const schema = z.object({
        username: z.string().trim().min(1, { message: "This field is required" }),
        password: z.string().trim().min(1, { message: "This field is required" })
    })

    //React-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

    //ReactToastify
    const loginSuccesfulToast = () => toast.success('Logged in successfully!', {
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
    const loginFailedToast = () => toast.error('Login failed! Please check your login details and try again.', {
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

    const onSubmit = (formData) => {
        const requestData = {
            Username: formData.username,
            Password: formData.password
        };
        axios.post(`${process.env.API_URL}login`, requestData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.data)
            .then((data) => {
                if (data.user) {
                    loginSuccesfulToast();
                    setTimeout(() => {
                        localStorage.setItem("user", JSON.stringify(data.user));
                        localStorage.setItem("token", data.token);
                        dispatch(setUser({ user: data.user, token: data.token }));
                    }, 2000);
                } else {
                    loginFailedToast();
                }
            })
            .catch((e) => {
                alert("Something went wrong");
            });

    }
    return (
        <Container className="loginBox">
            <ToastContainer />
            <h2>Login</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="loginFormUsername" className="formBox">
                    <Form.Control
                        type="text"
                        placeholder=""
                        {...register("username")}
                        autoComplete="username"
                    />
                    {errors.username && (
                        <Form.Text className="text-danger">
                            {errors.username.message}
                        </Form.Text>
                    )}
                    <Form.Label>Username</Form.Label>
                </Form.Group>
                <Form.Group controlId="loginFormPassword" className="formBox">
                    <Form.Control
                        type="password"
                        {...register("password", {
                            required: true
                        })}
                        placeholder=""
                        autoComplete="password"
                    />
                    {errors.password && (
                        <Form.Text className="text-danger">
                            {errors.password.message}
                        </Form.Text>
                    )}
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