import React from "react";
import axios from "axios";
import { connect } from 'react-redux';

import { Col, Row, Container, Button } from "react-bootstrap";
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import "./main-view.scss";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
// import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavbarView } from "../navbar-view/navbar-view";

class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            user: null
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken != null) {
            this.props.setUser({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    // Query cinesam2022 API /movies endpoint to set movies state
    getMovies(token) {
        axios.get('https://cinesam2022.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the movies props
                this.props.setMovies(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    /* On successful login, set token and user variables of local State & load the movies list (getMovies) */
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    render() {
        let { movies } = this.props;
        let { user } = this.state;
        return (
            <Router>
                <Row>
                    <NavbarView user={user} />
                </Row>
                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <MoviesList movies={movies} />;
                    }} />

                    <Route path="/register" render={() => {
                        if (user) return <Redirect to="/" />
                        return <Col>
                            <LoginView />
                        </Col>
                    }} />

                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        if (!user) {
                            return (
                                <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                            );
                        }

                        if (movies.length === 0) {
                            return <div className="movie-view" />;
                        }

                        return (

                            <Col md={8}>
                                <MovieView movie={movies.find(m => m._id === match.params.movieId)}
                                    onBackClick={() => history.goBack()} />
                            </Col>
                        );
                    }} />

                    <Route exact path="/profile" render={({ history }) => {
                        if (!user) {
                            return (
                                <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                            );
                        }

                        return (
                            <Col md={8}>
                                <ProfileView movies={movies} onBackClick={() => history.goBack()} />
                            </Col>
                        );
                    }} />

                    <Route path="/genre/:name" render={({ match, history }) => {
                        if (!user) {
                            return (
                                <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                            );
                        }

                        if (movies.length === 0) {
                            return <div className="movie-view" />;
                        }

                        return (
                            <Col md={8}>
                                <GenreView
                                    genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                                    onBackClick={() => history.goBack()}
                                    movies={movies.filter(movie => movie.Genre.Name === match.params.name)} />
                            </Col>
                        );
                    }} />

                    <Route path="/directors/:name" render={({ match, history }) => {
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/genres/:name" render={({ match, history }) => {
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path='/users/:username'
                        render={({ history, match }) => {
                            if (!user) return
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>

                            if (movies.length === 0) return <div className="main-view" />;

                            return <Col md={8}>
                                <ProfileView onBackClick={() => history.goBack()} movies={movies}
                                />
                            </Col>
                        }} />
                </Row>
                <Button id="logout-button" onClick={() => { this.onLoggedOut() }}>Logout</Button>
            </Router>
        );
    }
}

let mapStateToProps = state => {
    return { movies: state.movies }
}

// #8
export default connect(mapStateToProps, { setMovies })(MainView);