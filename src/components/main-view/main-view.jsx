// myFlix-client/src/main-view/main-view.jsx
import React from 'react';
import axios from 'axios';
import { Col, Row, Container } from "react-bootstrap";
import "./main-view.scss"

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { NavbarView } from "../navbar-view/navbar-view";



class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    // Query cinesam2022 API /movies endpoint to set movies state
    getMovies(token) {
        axios.get('https://cinesam2022.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        axios.get('https://cinesam2022.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(erorr => {
                console.log(erorr);
            });
    }

    // componentWillUnmount(){}

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onRegistration(register) {
        this.setState({
            register
        });
    }

    render() {
        const { movies, selectedMovie, user, register } = this.state;

        // if (!register) return <RegistrationView onRegistration={(register) => this.onRegistration(register)} />;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        if (movies.length === 0) return <div className="main-view" />;
        return (
            <Container>
                <Row>
                    <NavbarView user={user} />

                </Row>
                <Row className="main-view justify-content-md-center">
                    {selectedMovie
                        ? (
                            <Col md={6}>
                                <MovieView movie={selectedMovie}
                                    onBackClick={newSelectedMovie => {
                                        this.setSelectedMovie(newSelectedMovie);
                                    }}
                                />
                            </Col>
                        )
                        : (
                            movies.map(movie => (
                                <Col md={6} lg={4}>
                                    <MovieCard key={movie._id}
                                        movie={movie}
                                        onMovieClick={newSelectedMovie => {
                                            this.setSelectedMovie(newSelectedMovie);
                                        }}
                                    />
                                </Col>
                            ))
                        )
                    }
                </Row>
            </Container>
        );
    }
}

export default MainView;