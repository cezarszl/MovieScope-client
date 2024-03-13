import React from 'react'
import { Button, Col, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./update-user.scss"
import { useForm } from "react-hook-form";
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";



export const UpdateUser = ({ handleUpdate, username, birthday, email, deleteAccount }) => {
    const api = process.env.API_URL;
    console.log(api);
    //Zod form schema
    const schema = z.object({
        username: z.string().trim().min(1, { message: "This field is required" }),
        password: z.string().trim().min(6, { message: "Password must contain at least 6 character(s)" }),
        email: z.string().email(),
        birthday: z.coerce.date()
    });

    //React-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            username: username,
            password: "",
            email: email,
            birthday: birthday.slice(0, 10)
        }
    });


    return (
        <Col className="d-flex justify-content-center">
            <Card className="updateCard">
                <Card.Body className="updateBox">
                    <Card.Title>Update your information</Card.Title>
                    <Form onSubmit={handleSubmit(handleUpdate)}>
                        <Form.Group controlId="updateFormUsername" className="formBox">
                            <Form.Control
                                type="text"
                                placeholder=''
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
                        <Form.Group controlId="updateFormPassword" className="formBox">
                            <Form.Control
                                type="password"
                                {...register("password")}
                                autoComplete="password"
                                placeholder=''
                            />
                            {errors.password && (
                                <Form.Text className="text-danger">
                                    {errors.password.message}
                                </Form.Text>
                            )}
                            <Form.Label>New password</Form.Label>
                        </Form.Group>
                        <Form.Group className="formBox">
                            <Form.Control
                                type="text"
                                {...register("email")}
                                autoComplete="email"
                                placeholder=''
                            />
                            {errors.email && (
                                <Form.Text className="text-danger">
                                    {errors.email.message}
                                </Form.Text>
                            )}
                            <Form.Label>Email</Form.Label>
                        </Form.Group>
                        <Form.Group className="formBox">
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
                        <Button
                            type="submit"
                            id="updateBtn"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Update profile
                        </Button>
                        <Form.Group>
                            <Link className="removeLink">
                                <Button
                                    onClick={() => { if (window.confirm('Would you like to delete your account permanently?')) { deleteAccount() }; }}
                                    className="removeBtn"
                                >
                                    Remove account permanently
                                </Button>
                            </Link>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    )
}
