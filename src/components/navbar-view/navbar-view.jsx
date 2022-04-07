import React from "react";
import './navbar-view.scss';

import { Navbar, Container, Nav, Button, Offcanvas, NavDropdown, Form, FormControl } from 'react-bootstrap';


export function NavbarView({ user }) {

    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    };

    return (
        <Navbar id="navbar" fixed="top">
            <Container id="navbar-container">
                <Navbar.Brand id="navbar-brand" href="#">myFlix</Navbar.Brand>
                <Nav id="nav" className="me-auto">
                    <Nav.Link id="nav-link" href="#home">Account</Nav.Link>
                    <Nav.Link id="nav-link" href="#features">Watchlist</Nav.Link>
                    <Nav.Link id="nav-link" href="#pricing">Register</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}