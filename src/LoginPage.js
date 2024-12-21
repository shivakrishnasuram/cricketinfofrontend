import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import bcrypt from "bcryptjs";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((user) => user.username === formData.username);

        if (user && (await bcrypt.compare(formData.password, user.password))) {
            setMessage("Login successful!");
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            setTimeout(() => navigate("/Cards"), 1000); // Redirect after 1 second
        } else {
            setMessage("Invalid username or password!");
        }
    };

    return (
        <Container className="form-container">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="text-center">Login</h2>
                    {message && <Alert variant={message.includes("successful") ? "success" : "danger"}>{message}</Alert>}
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

                        <Button variant="primary" type="submit" className="w-100">
                            Login
                        </Button>
                        <Link to="/">
                            <p>Don't have an account? Register here</p>
                        </Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;
