import { Button, Form, Container, Toast } from "react-bootstrap";
import { useForm } from "react-hook-form";
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast, Bounce } from "react-toastify";

import "./signup-view.scss";
const SignupView = () => {

    //Zod form schema
    const schema = z.object({
        username: z.string().min(3),
        password: z.string(),
        email: z.string().email(),
        birthday: z.coerce.date()
    })
    const { register, handleSubmit, setError, formState: { errors } } = useForm({ resolver: zodResolver(schema) });



    const registrationToast = () => toast.success('Registered successfully!', {
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

        const data = {
            Username: formData.username,
            Password: formData.password,
            Email: formData.email,
            Birthday: formData.birthday
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
                    registrationToast();
                    setTimeout(() => {
                        window.location.replace("/login");
                    }, 2000);
                } else {
                    setError("username", { message: 'This username is already taken.' })
                }
            })
    };

    return (
        <Container className="signupBox">
            <ToastContainer />
            <h2>Signup</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="signUpFormUsername" className="formBox">
                    <Form.Control
                        type="text"
                        placeholder=""
                        {...register("username")}

                    />
                    {errors.username && (
                        <Form.Text className="text-danger">
                            {errors.username.message}
                        </Form.Text>
                    )}
                    <Form.Label>Username</Form.Label>

                </Form.Group>

                <Form.Group controlId="signUpFormPassword" className="formBox">

                    <Form.Control
                        type="password"
                        {...register("password", {
                            required: true
                        })}
                        placeholder=""
                    />
                    {errors.password && (
                        <Form.Text className="text-danger">
                            {errors.password.message}
                        </Form.Text>
                    )}
                    <Form.Label>Password</Form.Label>
                </Form.Group>
                <Form.Group controlId="signUpFormEmail" className="formBox">
                    <Form.Control
                        type="text"
                        {...register("email", {
                            required: "WYmgane pole"
                        })}
                        placeholder=""
                    />
                    {errors.email && (
                        <Form.Text className="text-danger">
                            {errors.email.message}
                        </Form.Text>
                    )}
                    {errors.email && (
                        <Form.Text className="text-danger">
                            {errors.email.message}
                        </Form.Text>
                    )}
                    <Form.Label>Email</Form.Label>
                </Form.Group>
                <Form.Group controlId="signUpFormBirthday" className="formBox">
                    <Form.Control
                        type="date"
                        {...register("birthday", {
                            required: true
                        })}
                    />
                    {errors.birthday && (
                        <Form.Text className="text-danger">
                            {errors.birthday.message}
                        </Form.Text>
                    )}
                    <Form.Label className="birthdayLabel">Birthday</Form.Label>

                </Form.Group>
                <Button id="signupBtn" type="submit">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Signup
                </Button>
            </Form>
        </Container>
    );
};
export { SignupView }; 