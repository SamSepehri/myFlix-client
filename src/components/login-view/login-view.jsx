import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";

import { setUser } from '../../actions/actions';

import "./login-view.scss"

import axios from 'axios';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //validation declarations
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username Required');
            isReq = false;
        } else if (username.length < 2) {
            setUsernameErr('Username must be at least 2 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.length < 6) {
            setPasswordErr('Password must be at least 6 characters long');
            isReq = false;
        }
        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            axios
                .post("https://cinesam2022.herokuapp.com/login", {
                    Username: username,
                    Password: password,
                })
                .then((response) => {
                    const data = response.data;
                    console.log(data)
                    props.onLoggedIn(data);

                })
                .catch((error) => {
                    console.log("Error:", error);
                });
        }
    };

    return (
        <Container id="login-form">
            <Row>
                <Col>
                    <CardGroup>
                        <Card id="login-card">
                            <Card.Body>
                                <Card.Title id="login-card-title">Please login</Card.Title>
                                <Form>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label id="login-form-label">Username</Form.Label>
                                        <Form.Control type="text" onChange={e => setUsername(e.target.value)}
                                            placeholder="Enter your username" />
                                        {usernameErr && <p>{usernameErr}</p>}
                                    </Form.Group>
                                    <Form.Group controlId="formPassword">
                                        <Form.Label id="login-form-label">Password</Form.Label>
                                        <Form.Control type="password" onChange={e => setPassword(e.target.value)}
                                            placeholder="Enter your password" />
                                        {passwordErr && <p>{passwordErr}</p>}
                                    </Form.Group>
                                    <Button id="login-button" variant="primary" type="submit" onClick={handleSubmit}>Login</Button>
                                </Form>
                                <Card.Text>Not registered yet?</Card.Text>
                                <div id="register-container">
                                    <Link to="/register">
                                        <Button id="link-to-register-button">Register now</Button>
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>

    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired
};



export default LoginView;