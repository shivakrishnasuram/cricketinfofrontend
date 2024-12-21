// RegistrationPage.js
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import bcrypt from "bcryptjs";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { Link } from "react-router-dom";

function RegistrationPage() {
    const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.find((user) => user.username === formData.username)) {
            setMessage("Username already exists!");
        } else if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match!");
        } else {
            const { username, email, password } = formData;
            const hashedPassword = await bcrypt.hash(password, 10);
            users.push({ username, email, password: hashedPassword });
            localStorage.setItem("users", JSON.stringify(users));
            setMessage("Registration successful!");
            setFormData({ username: "", email: "", password: "", confirmPassword: "" });
        }
    };

    return (
        <Container className="form-container">
            <Row className="justify-content-md-center">
                <Col md={6}>
               <h1 className="text-center">Welcome to CricketInfo</h1>
                    <h2 className="text-center">Register</h2>
                    {message && <Alert variant="info">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100" disabled={!(formData.username && formData.email && formData.password && formData.confirmPassword)}>
                            Register
                        </Button>
                        <Link to="/login" className="text-decoration-none pt-20">Already have an account? <span>login?</span></Link>

                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default RegistrationPage;