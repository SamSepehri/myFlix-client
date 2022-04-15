import React from "react";
import axios from "axios";
import { Col, Row, Container, Button } from "react-bootstrap";
import "./main-view.scss";

import { connect } from "react-redux";
import { setMovies, setUser } from "../../actions/actions";
import MoviesList from '../movies-list/movies-list';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavbarView } from "../navbar-view/navbar-view";

class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            user: null
        };
    }

    // When token is present (user is logged in), get list of movies
    componentDidMount() {
        let acessToken = localStorage.getItem('token');
        if (acessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(acessToken);
        }
    }

    // Query cinesam2022 API /movies endpoint to set movies state
    getMovies(token) {
        axios.get('https://cinesam2022.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setMovies(response.data);
            })
            .catch(error => {
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

    render() {
        let { movies } = this.props;
        let { user } = this.state;
        // if (!register) return <RegistrationView onRegistration={(register) => this.onRegistration(register)} />;

        return (
            <Router>
                <NavigationView user={user} />
                <Row className="main-view justify-content-md-center">


                    <Route exact path="/" render={() => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>

                        if (movies.length === 0) return <div className="main-view" />;

                        return <MoviesList movies={movies} />
                    }} />

                    <Route path="/register" render={() => {
                        return <Col>
                            <RegisterView />
                        </Col>
                    }} />

                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/profile" render={({ history }) => {
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
                </Row>
            </Router>
        );
    }
}

let mapStateToProps = state => {
    return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);