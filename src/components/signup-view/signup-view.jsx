import { Button, Form, Container, Toast } from "react-bootstrap";
import { useForm } from "react-hook-form";
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast, Bounce } from "react-toastify";
import axios from "axios";
import "./signup-view.scss";
const SignupView = () => {

    //Zod form schema
    const schema = z.object({
        username: z.string().trim().min(1, { message: "This field is required" }),
        password: z.string().trim().min(6, { message: "Password must contain at least 6 character(s)" }),
        email: z.string().email(),
        birthday: z.coerce.date()
    })

    //React-hook-form
    const { register, handleSubmit, setError, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

    //ReactToastify
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
        axios.post(`${process.env.API_URL}users`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response);
                registrationToast();
                setTimeout(() => {
                    window.location.replace("/login");
                }, 2000);
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    setError("username", { message: 'This username is already taken.' });
                } else {
                    console.error("Error:", error);
                }
            });
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
                        {...register("email")}
                        placeholder=""
                    />
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
                        {...register("birthday")}
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