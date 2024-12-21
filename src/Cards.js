// import Form from './Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, Navbar, Nav, Form, FormControl } from 'react-bootstrap';
// import { Navigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
const BatterCards = () => {
    const [batters, setBatters] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        fetch('https://cricketinfos.onrender.com/batters')
            .then((response) => response.json())
            .then((data) => setBatters(data))
            .catch((error) => console.error('Error fetching batters:', error));
    }, []);
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    const filteredBatters = batters.filter((batter) =>
        batter.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">CricketInfo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search Players"
                                className="me-2"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="mt-4">
                <Row>
                    {filteredBatters.map((batter) => (
                        <Col key={batter.id} sm={12} md={6} lg={4} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={batter.image} alt={batter.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                <Card.Body>
                                    <Card.Title>{batter.name}</Card.Title>
                                    <Card.Text>{batter.role}</Card.Text>
                                    <Button variant="primary" onClick={() => {
                                        const achievementsElement = document.querySelector(`#achievements-${batter.id}`);
                                        if (achievementsElement) {
                                            achievementsElement.style.display = achievementsElement.style.display === 'block' ? 'none' : 'block';
                                        }
                                    }}>More About {batter.name}</Button>
                                    <Card.Text id={`achievements-${batter.id}`} style={{ display: 'none' }}>{batter.achievements}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Form/>
        </>
    );
};

export default BatterCards;
